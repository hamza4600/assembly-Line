import { useState } from 'react';
import style from './style.module.css'
import { Input, treeInputs, } from './variable'

const initialValue = [
    { id: 'bussinessName', value: '' },
    { id: 'bussinessName2', value: '' },
    { id: 'bussinessName3', value: '' },
    { id: 'bussinessName4', value: '' },
    { id: 'bussinessName5', value: '' },
    { id: 'bussinessName6', value: '' },
];

export const Ui = () => {

    const [treeValues, setTreeValues] = useState(initialValue);

    const onInputChange = (event) => {
        // update value in treeValues Not getting updated value 
        
        const { id, value } = event.target;
        console.log(id, value);

        const newValue = treeValues.map((item) => {
            if (item.id === id) {
                console.log('item.id === id');
                return {
                    ...item,
                    value: value
                }
            }
            return item;
        })

        setTreeValues(newValue);
    }

    const fomSubmit = () => {
        // show all values of input fields in console
        console.log(treeValues);
    }


    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    maxWidth: '100%',
                    alignItems: 'center',
                }}
            >
                {
                    treeInputs.map((item, index) => (
                        <div key={index}
                            id="row"
                            className={style.row}
                        >
                            {
                                item.row.map((row, index) => (
                                    <div
                                        key={index}
                                        style={{ width: item.width === 'half' ? ' ' : '100%', }}
                                    >
                                        <Input
                                            type={row.type}
                                            placeholder={row.placeholder}
                                            required={row.required}
                                            onChange={onInputChange}
                                            error={row.error}
                                            valid={row.valid}
                                            validation={row.validation}
                                            options={row.options}
                                            id={row.id}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
                <button
                    type="submit"
                    onClick={fomSubmit}
                >Submit</button>
            </div>
        </>
    )
}


const Index = () => {
    return (
        <>
            <div className={style.main}>
                <code>Working on Dunmanic Input fields in Js</code>

                <div
                    style={{ width: '100%' }}
                >
                    <Ui />
                </div>
            </div>
        </>
    )
}

export default Index