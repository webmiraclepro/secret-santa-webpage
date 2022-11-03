import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../../state/store';
import { getPersons } from '../../state/person/reducer';
import { getRules, addRule, removeRule, ruleSlice } from '../../state/rule/reducer';

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
            <p className='text-xl text-blue'>People on your list</p>
            {
                persons.map(({ id, name }) => {
                    return (
                        <p className='text-lg text-left'>
                            {name}
                        </p>
                    )

                })
            }
            <Link href="/">
                <button className='border rounded-lg bg-blue-400 text-white px-10 py-3 mt-10 items-center justify-center' onClick={() => { console.log("Edit list clicked") }}>
                    Edit list
                </button>
            </Link>

            {
                
                rules.map(({ id, firstPerson, secondPerson, isVerca }, index) => {
                    return (
                        <div className='flex flex-col my-5' key={id}>
                            <p className="text-lg">Rule#{index + 1}</p>
                            <div className='flex flex-row items-center justify-between justify-center'>
                                <TextField
                                    id="first people"
                                    select
                                    value={firstPerson}
                                    className="w-[200px]"
                                >
                                    {persons.map(({ id, name }) => (
                                        <MenuItem key={id} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <p className='mx-10'>can't give to</p>
                                <TextField
                                    id="second people"
                                    select
                                    value={secondPerson}
                                    className="w-[200px]"
                                >
                                    {persons.filter(function ({ id, name }) {
                                        return name !== firstPerson
                                    }).map(({ id, name }) => (
                                        <MenuItem key={id} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <Checkbox
                                    checked={isVerca}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    className="rounded-sm"
                                />
                                <p className='mx-2 '>and vice versa</p>
                                <MinusCircleIcon className="cursor-pointer w-5 h-5 text-teal-500 ml-10" onClick={() => removeRuleRow(id)} />
                            </div>
                        </div>

                    )
                })
            }

            <div className='flex flex-col my-5'>
                <p className="text-lg">Rule#{rules.length + 1}</p>
                <div className='flex flex-row items-center justify-between justify-center'>
                    <TextField
                        id="first people"
                        select
                        value={people1}
                        onChange={handleChange1}
                        className="w-[200px]"
                    >
                        {persons.map(({ id, name }) => (
                            <MenuItem key={id} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <p className='mx-10'>can't give to</p>
                    <TextField
                        id="second people"
                        select
                        value={people2}
                        onChange={handleChange2}
                        className="w-[200px]"
                    >
                        {persons.filter(function ({ id, name }) {
                            return name !== people1
                        }).map(({ id, name }) => (
                            <MenuItem key={id} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                        className="rounded-sm"
                    />
                    <p className='mx-2 '>and vice versa</p>
                    <PlusCircleIcon className="cursor-pointer w-5 h-5 text-teal-500 ml-10" onClick={addRuleRow} />
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