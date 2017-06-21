import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

class FinishScreen extends React.Component {
    static propTypes = {
        onFinish: PropTypes.func.isRequired,
        isSubmiting: PropTypes.bool.isRequired,
        isSubmitFailed: PropTypes.bool.isRequired
    }

    state = {
        isClicked: false
    }

    onClick = () => {
        this.setState({ isClicked: true })
        this.props.onFinish()
    }

    onReloadClick = () => {
        window.location.reload()
    }

    renderComplete() {
        return (
            <div>
                Бронь завершена
                <Button onClick={this.onReloadClick}>
                    Пройти процедуру сначала
                </Button>
            </div>
        )
    }

    renderFailed() {
        return (
            <div>
                Возникла ошибка в процессе бронирования
                <Button onClick={this.onClick}>
                    Попробовать снова?
                </Button>
            </div>
        )
    }

    renderSubmiting() {
        return (
            <div>
                Бронирование...
            </div>
        )
    }

    renderBeforeClick() {
        return (
            <div>
                Финиш!
                <Button onClick={this.onClick}>
                    Забронировать
                </Button>
            </div>
        )
    }

    render() {
        return (
            <div>
                {!this.state.isClicked
                    ? this.renderBeforeClick()
                    : this.props.isSubmiting
                        ? this.renderSubmiting()
                        : this.props.isSubmitFailed
                            ? this.renderFailed()
                            : this.renderComplete()
                }
            </div>
        );
    }
}

export default FinishScreen;