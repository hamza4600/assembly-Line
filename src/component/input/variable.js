import { useState } from "react";
import style from './style.module.css'

// half width have two input fields and full width have one input field
export const treeInputs = [
    {
        id: 5,
        width: 'half',
        row: [
            {
                title: 'Business Name',
                type: 'text',
                placeholder: 'Enter Business Pakys',
                required: true,
                id: 'businessName',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 50,
                }
            },
            {
                title: 'Business Name',
                type: 'text',
                placeholder: 'Enter Business Usa',
                id: 'businessName2',
                required: true,
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 50,
                }
            }
        ],
    },
    {
        id: 100,
        width: 'full',
        row: [
            {
                title: 'Business Name',
                type: 'text',
                placeholder: 'Enter Business Europ',
                id: 'businessName3',
                required: true,
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 50,
                }
            },
        ]
    },
    // dropdown
    {
        id: 10,
        width: 'full',
        row: [
            {
                title: 'Business Category',
                type: 'select',
                placeholder: 'Select Business Category',
                id: 'businessCategory',
                required: true,
                valid: false,
                touched: false,
                validation: {
                    required: true,
                },
                options: [
                    { value: '1', displayValue: 'Category 1' },
                    { value: '2', displayValue: 'Category 2' },
                    { value: '3', displayValue: 'Category 3' },
                    { value: '4', displayValue: 'Category 4' },
                    { value: '5', displayValue: 'Category 5' },
                    { value: '6', displayValue: 'Category 6' },
                    { value: '7', displayValue: 'Category 7' },
                ]
            }
        ]
    },
    {
        id: 6,
        width: 'half',
        row: [
            {
                title: 'Business Name',
                type: 'text',
                placeholder: 'Enter Business Pakys',
                id: 'businessName4',
                required: true,
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 50,
                }
            },
            {
                title: 'Business Name',
                type: 'text',
                placeholder: 'Enter Business Usa',
                id: 'businessName5',
                required: true,
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 50,
                }
            }
        ],
    },
];


export const Input = (props) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState(props.error);
    const [valid, setValid] = useState(props.valid);

    const inputChangeHandler = (event) => {
        const value = event.target.value;
        const valid = checkValidity(value, props.validation);
        const error = !valid ? 'Please enter a valid value' : '';
        setValue(value);
        setValid(valid);
        setError(error);
        props.onChange(event);
    }

    const checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    return (
        <>
            <div className={style.formGroup}>
                {
                    props.type === 'select' ?
                        <select
                            className={style.formControl}
                            value={value}
                            onChange={inputChangeHandler}
                            required={props.required}
                            id={props.id}
                        >
                            {
                                props.options.map((option, index) => (
                                    <option key={index} value={option.value}>{option.displayValue}</option>
                                ))
                            }
                        </select>
                        :
                        <input
                            className={style.formControl}
                            type={props.type}
                            placeholder={props.placeholder}
                            value={value}
                            onChange={inputChangeHandler}
                            required={props.required}
                            id={props.id}
                        />
                }
                {
                    !valid &&
                    <div className={style.textDanger}>{error}</div>
                }
            </div>
        </>
    )
}