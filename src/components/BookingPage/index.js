import React from 'react';
import { inject, observer } from 'mobx-react';
import { action, computed, runInAction, extendObservable } from 'mobx'
import { Button } from 'react-bootstrap';
import BookingForm from './BookingForm';
import BookingScene from './BookingScene';
import FinishScreen from './FinishScreen'

class BookingPage extends React.Component {
    static pageMap = {
        0: 'Форма',
        1: 'Сцена',
        2: 'Финиш'
    }

    constructor(props, context) {
        super(props, context)
        extendObservable(this, {
            currentPage: 0,
            event: null,
            form: null,
            isSubmiting: true,
            isSubmitFailed: false,
            isFormFilled: computed(() => !!(this.event && this.form)),
            canGoBack: computed(() => {
                return this.currentPage > 0;
            }),
            canGoForward: computed(() => {
                switch (this.currentPage) {
                    case 0: return this.isFormFilled
                    case 1: return this.event.selectedSeats.length > 0
                    default: return false
                }
            })
        })
        global.app = this
    }

    setSubmitFailed = action('setSubmitFailed', (isSubmitFailed) => {
        this.isSubmitFailed = isSubmitFailed
    })

    setSubmiting = action('setSubmiting', (isSubmiting) => {
        this.isSubmiting = isSubmiting
    })

    goBack = action(() => {
        this.currentPage -= 1
    })

    goForward = action('goForward', () => {
        const { currentPage } = this
        if (currentPage === 0) {
            if (!this.event || !this.form) {
                alert('Форма не заполнена!')
                return
            }
        } else if (currentPage === 1) {
            if (this.event.selectedSeats.length === 0) {
                alert('Место не выбрано!')
                return
            }
        }

        this.currentPage += 1
    })

    onSelectSeat = action('onSelectSeat', (seat) => {
        const idx = this.event.selectedSeats.indexOf(seat)
        seat.setSelected(idx === -1)
    });

    onFormSubmit = action('onFormSubmit', (form, event) => {
        this.event = event
        this.form = form
        this.goForward()
    })

    onFinish = async () => {
        try {
            runInAction('reset before submit', () => {
                this.setSubmitFailed(false)
                this.setSubmiting(true)
            })

            await this.props.appState.submitFinish(this.event, this.seat, this.form)
            runInAction('mark isTaken', () => {
                this.event.selectedSeats.forEach(seat => {
                    seat.isTaken = true
                    seat.isSelected = false
                })
            })
            await this.props.appState.loadEvents()
        } catch (error) {
            this.setSubmitFailed(true)
        } finally {
            this.setSubmiting(false)
        }
    };

    onBackClick = () => {
        this.goBack();
    }

    onForwardClick = () => {
        this.goForward()
    }

    renderBookingForm() {
        return (
            <BookingForm
                events={this.props.appState.events}
                onSubmit={this.onFormSubmit}
            />
        )
    }

    renderBookingScene() {
        return (
            <BookingScene
                event={this.event}
                onSelect={this.onSelectSeat}
            />
        )
    }

    renderFinish() {
        return (
            <FinishScreen
                onFinish={this.onFinish}
                isSubmiting={this.isSubmiting}
                isSubmitFailed={this.isSubmitFailed}
            />
        )
    }

    renderCurrentPage() {
        switch (this.currentPage) {
            case 0: {
                return this.renderBookingForm()
            }
            case 1: {
                return this.renderBookingScene()
            }
            case 2: {
                return this.renderFinish()
            }
        }
    }

    renderNavigation() {
        return (
            <div>
                <Button
                    disabled={!this.canGoBack}
                    onClick={this.onBackClick}
                >
                    {'<'}
                </Button>
                <span
                    style={{
                        border: '1px solid red',
                    }}
                >
                    {BookingPage.pageMap[this.currentPage]}
                </span>
                <Button
                    disabled={!this.canGoForward}
                    onClick={this.onForwardClick}
                >
                    {'>'}
                </Button>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderNavigation()}
                <hr />
                {this.renderCurrentPage()}
            </div>
        )
    }
}

export default inject('appState')(observer(BookingPage));