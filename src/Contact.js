import React, { useReducer, useCallback } from 'react';
import { Button, TextInput, Table, Panel } from '@wf/ria'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { getContractDetails, updateUserEmailContact } from '../actions/internalManagement'; 
import { FormattedMessage, useIntl } from 'react-intl';

// Define initial state
const initialState = {
    inputValue: '',
    showTable: false,
    isPanelOpen: false,
    emailValue: '',
    isEmailValid: false,
};

// Reducer for handling the state changes
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_INPUT_VALUE':
            return { ...state, inputValue: action.payload };
        case 'SET_EMAIL_VALUE':
            return { ...state, emailValue: action.payload };
        case 'TOGGLE_SHOW_TABLE':
            return { ...state, showTable: action.payload };
        case 'TOGGLE_PANEL':
            return { ...state, isPanelOpen: action.payload };
        case 'SET_EMAIL_VALIDITY':
            return { ...state, isEmailValid: action.payload };
        default:
            return state;
    }
};

export function UpdateUser() {
    const [state, dispatchLocal] = useReducer(reducer, initialState); // Using useReducer
    const dispatch = useDispatch();
    const { formatMessage } = useIntl();

    const emailCheckValidator = useCallback((value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
    }, []);

    const handleOnChange = useCallback((value) => {
        dispatchLocal({ type: 'SET_INPUT_VALUE', payload: value });
    }, []);

    const handleOnEmailChange = useCallback((value) => {
        dispatchLocal({ type: 'SET_EMAIL_VALUE', payload: value });
        const isValid = emailCheckValidator(value);
        dispatchLocal({ type: 'SET_EMAIL_VALIDITY', payload: isValid });
    }, [emailCheckValidator]);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(getContractDetails(state.inputValue)); // Dispatch API call
            dispatchLocal({ type: 'TOGGLE_SHOW_TABLE', payload: true });
        } catch (error) {
            console.error('Error fetching contract details:', error);
            // Handle error, perhaps show a notification or alert
        }
    };

    const onSaveEmail = async () => {
        try {
            await dispatch(updateUserEmailContact(state.emailValue)); // Dispatch API call
            dispatchLocal({ type: 'TOGGLE_PANEL', payload: false });
        } catch (error) {
            console.error('Error saving email:', error);
            // Handle error, perhaps show a notification or alert
        }
    };

    const handleEditClick = useCallback(() => {
        dispatchLocal({ type: 'TOGGLE_PANEL', payload: true });
    }, []);

    return (
        <div className="UpdateUserPage">
            <h1><FormattedMessage id="js.user.contract.title" /></h1>
            
            {/* Edit Email Panel */}
            <Panel 
                onClose={() => dispatchLocal({ type: 'TOGGLE_PANEL', payload: false })} 
                isOpen={state.isPanelOpen} 
                title="Edit Email" 
            >
                <TextInput 
                    name="email"
                    label="Email" 
                    value={state.emailValue} 
                    onValueChange={handleOnEmailChange} 
                    customValidators={[emailCheckValidator]} 
                />
                <Button kind="standard" label="Save" onClick={onSaveEmail} disabled={!state.isEmailValid} />
            </Panel>

            {/* Contract Search Form */}
            <form onSubmit={handleOnSubmit}>
                <TextInput
                    name="contract"
                    label="Contract ID"
                    value={state.inputValue}
                    onValueChange={handleOnChange}
                />
                <Button type="submit" label="Search" kind="primary" />
            </form>

            {/* Results Table */}
            {state.showTable && (
                <div className="ContractHeader">
                    <h2><FormattedMessage id="js.app.title.search.results" /></h2>
                    <TableComponent handleEditClick={handleEditClick} />
                </div>
            )}
        </div>
    );
}

// Table Component 
function TableComponent({ handleEditClick }) {
    const data = [
        { customer: '12345', contract: '11212121' },
        { customer: '1212121', contract: '42423232323' }
    ];

    return (
        <Table
            columns={[
                { key: 'customer', label: 'Customer' },
                { key: 'contract', label: 'Contract' },
                {
                    key: 'action',
                    label: 'Action',
                    emptyValue: item => (
                        <Button
                            kind="standard"
                            className="FeedbackButton"
                            slim
                            aria-label={`Edit contract for ${item.customer}`}
                            onClick={handleEditClick}
                        >
                            Edit
                        </Button>
                    )
                }
            ]}
            data={data}
            rowKey="customer"
        />
    );
}
