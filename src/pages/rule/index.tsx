import { useState, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import SelectMenu from '../../components/SelectMenu'
import { RootState, AppDispatch } from '../../state/store';
import { getPersons } from '../../state/person/reducer';
import { getRules, addRule, removeRule, ruleSlice } from '../../state/rule/reducer';
import { alpha, styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#60a5fa',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#60a5fa',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#60a5fa',
        },
        '&:hover fieldset': {
            borderColor: '#60a5fa',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#60a5fa',
            borderRadius: '10px'
        },
    },
});

export default function RulePage() {

    const dispatch = useDispatch<AppDispatch>();
    const persons = useSelector(({ people }: RootState) => getPersons(people.persons))
    const rules = useSelector(({ rule }: RootState) => getRules(rule.rules))
    const [people1, setPeople1] = useState('');
    const [people2, setPeople2] = useState('');
    const [checked, setChecked] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPeople1(event.target.value);
    };

    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPeople2(event.target.value);
    };

    const addRuleRow = () => {
        dispatch(addRule({ people1, people2, checked }))
        setPeople1("")
        setPeople2("")
        setChecked(false)
    }

    const removeRuleRow = (id: string) => {
        dispatch(removeRule(id))
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <p className='text-xl text-blue-400'>People on your list</p>
            <div className='text-left text-md text-blue-400'>
                {
                    persons.map(({ id, name }) => {
                        return (
                            <p>{name}</p>
                        )
                    })
                }
            </div>
            <Link href="/">
                <button className='border rounded-lg bg-blue-400 text-white px-10 py-3 mt-10 items-center justify-center' onClick={() => { console.log("Edit list clicked") }}>
                    Edit list
                </button>
            </Link>
            <p className='text-xl text-blue-400 py-8'>Create rules</p>
            {
                rules.map(({ id, firstPerson, secondPerson, isVerca }, index) => {
                    return (
                        <div className='flex flex-col my-5 text-blue-400' key={id}>
                            <p className="text-md py-2">Rule#{index + 1}</p>
                            <div className='flex flex-row items-center justify-between justify-center'>
                                <CssTextField
                                    id="first people"
                                    select
                                    color="info"
                                    value={firstPerson}
                                    inputProps={{ sx: { color: '#60a5fa' } }}
                                    className="w-[200px] text-blue-400 rounded-lg bg-blue-100 color-blue-400 border-blue-400"
                                >
                                    {persons.map(({ id, name }) => (
                                        <MenuItem key={id} value={name} className="text-blue-400">
                                            {name}
                                        </MenuItem>
                                    ))}
                                </CssTextField>
                                <span className='mx-8'>can't give to</span>
                                <CssTextField
                                    id="second people"
                                    select
                                    color="info"
                                    value={secondPerson}
                                    className="w-[200px] bg-blue-100"
                                    inputProps={{ sx: { color: '#60a5fa' } }}
                                >
                                    {persons.filter(function ({ id, name }) {
                                        return name !== firstPerson
                                    }).map(({ id, name }) => (
                                        <MenuItem key={id} value={name} className="text-blue-400">
                                            {name}
                                        </MenuItem>
                                    ))}
                                </CssTextField>
                                <Checkbox
                                    checked={isVerca}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    className="rounded-sm"
                                />
                                <p className='mr-2'>and vice versa</p>
                                <MinusCircleIcon className="cursor-pointer w-5 h-5 text-blue-400 ml-8" onClick={() => removeRuleRow(id)} />
                            </div>
                        </div>
                    )
                })
            }

            <div className='flex flex-col my-5 text-blue-400'>
                <p className="text-md">Rule#{rules.length + 1}</p>
                <div className='flex flex-row items-center justify-between justify-center'>
                    <CssTextField
                        id="first people"
                        select
                        value={people1}
                        onChange={handleChange1}
                        color="info"
                        className="w-[200px] bg-green-100 text-blue-400"
                        inputProps={{ sx: { color: '#60a5fa' } }}
                    >
                        {persons.map(({ id, name }) => (
                            <MenuItem key={id} value={name} className="text-blue-400">
                                {name}
                            </MenuItem>
                        ))}
                    </CssTextField>
                    <p className='mx-8'>can't give to</p>
                    <CssTextField
                        id="second people"
                        select
                        color="info"
                        value={people2}
                        onChange={handleChange2}
                        className="w-[200px] bg-green-100 text-blue-400"
                        inputProps={{ sx: { color: '#60a5fa' } }}
                    >
                        {persons.filter(function ({ id, name }) {
                            return name !== people1
                        }).map(({ id, name }) =>
                            <MenuItem key={id} value={name} className="text-blue-400">
                                {name}
                            </MenuItem>
                        )}
                    </CssTextField>

                    <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                        className="rounded-sm"
                    />
                    <p className='mx-2 '>and vice versa</p>
                    <PlusCircleIcon className="cursor-pointer w-5 h-5 text-blue-400 ml-8" onClick={addRuleRow} />
                </div>
            </div>

            <Link href="/download">
                <button className='border rounded-lg bg-blue-400 text-white px-5 py-3 mt-10 items-center justify-center' onClick={() => { localStorage.setItem("persons", JSON.stringify(persons)) }}>
                    Finished adding rules - let's go!
                </button>
            </Link>
        </div>
    )
}