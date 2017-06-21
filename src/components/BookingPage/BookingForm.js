import React from 'react'
import PropTypes from 'prop-types'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { Modal, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

class BookingForm extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        events: MobxPropTypes.observableArrayOf(PropTypes.instanceOf(Event)).isRequired
    };

    state = {
        event: 0,
        form: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: ''
        }
    }

    toggleBadEventModal() {
        this.setState(prevState => ({
            showBadEventModal: !prevState.showBadEventModal
        }))
    }

    createChangeHandler = (key) => (event) => {
        const { value } = event.target;

        event.preventDefault()
        this.setState(prevState => ({
            form: {
                ...prevState.form,
                [key]: value
            }
        }))
    }

    onChangeFirstName = this.createChangeHandler('firstName')
    onChangeLastName = this.createChangeHandler('lastName')
    onChangeEmail = this.createChangeHandler('email')
    onChangePhoneNumber = this.createChangeHandler('phoneNumber')
    onChangeDescription = this.createChangeHandler('description')

    onChangeEvent = (event) => {
        const { value } = event.target

        event.preventDefault()
        this.setState({
            event: value
        })
    }

    onSubmit = (_event) => {
        if (_event) {
            _event.preventDefault()
        }

        const event = this.props.events[this.state.event];
        if (!event) {
            this.toggleBadEventModal()
        } else {
            this.props.onSubmit(this.state.form, event)
        }
    }

    onModalCloseClick = () => {
        this.toggleBadEventModal()
    }

    renderBadEventModal() {
        return (
            <Modal.Dialog>
                <Modal.Body>
                    Не выбрано событие
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        bsStyle='primary'
                        onClick={this.onModalCloseClick}
                    >
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        )
    }

    render() {
        const { form } = this.state;
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <ControlLabel>Имя</ControlLabel>
                        <FormControl
                            autoFocus
                            required
                            type='text'
                            placeholder='Имя'
                            value={form.firstName}
                            onChange={this.onChangeFirstName}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Фамилия</ControlLabel>
                        <FormControl
                            required
                            type='text'
                            placeholder='Фамилия'
                            value={form.lastName}
                            onChange={this.onChangeLastName}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>E-mail</ControlLabel>
                        <FormControl
                            required
                            type='email'
                            placeholder='example@example.com'
                            value={form.email}
                            onChange={this.onChangeEmail}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Телефон</ControlLabel>
                        <FormControl
                            required
                            type='phone'
                            placeholder=''
                            value={form.phoneNumber}
                            onChange={this.onChangePhoneNumber}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Событие</ControlLabel>
                        <FormControl
                            required
                            componentClass='select'
                            placeholder='Выбирите событие'
                            value={this.state.event}
                            onChange={this.onChangeEvent}
                        >
                            {this.props.events.map((event, index) => (
                                <option key={event.id} value={index}>
                                    {event.name} ({event.datePretty})
                                </option>
                            ))}
                        </FormControl>
                    </FormGroup>
                    <Button
                        bsStyle='primary'
                        type='submit'
                    >
                        Далее
                    </Button>
                </Form>
                {this.state.showBadEventModal && this.renderBadEventModal()}
            </div>
        );
    }
}

export default observer(BookingForm);