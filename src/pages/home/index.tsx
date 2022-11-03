
import { useState } from "react"
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline'
import { RootState, AppDispatch } from '../../state/store';
import { addPerson, removePerson, getPersons } from '../../state/person/reducer';

export default function HomePage() {

    const dispatch = useDispatch<AppDispatch>();
    const persons = useSelector(({ people }: RootState) => getPersons(people.persons));

    const [name, setName] = useState<string>("")

    const addUser = () => {
        dispatch(addPerson(name))
        setName("")
    }

    const removeUser = (id: string) => {
        dispatch(removePerson(id))
    }
    return (
        <div className='flex flex-col justify-center items-center'>
            <main >
                {
                    persons.map(({ id, name }, index) => {
                        return (
                            <div className='flex flex-col my-5' key={id}>
                                <p className="text-lg">Person#{index + 1}</p>
                                <div className='flex flex-row items-center justify-between justify-center'>
                                    <input type="text" className="rounded-lg border p-3" value={name} />
                                    <MinusCircleIcon className="cursor-pointer w-5 h-5 text-teal-500" onClick={() => removeUser(id)} />
                                </div>
                            </div>
                        )
                    })
                }

                <div className='flex flex-col my-5'>
                    <p className="text-lg">Person#{persons.length + 1}</p>
                    <div className='flex flex-row items-center justify-between justify-center'>
                        <input type="text" className="rounded-lg border p-3" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                        <PlusCircleIcon className="cursor-pointer w-5 h-5 text-teal-500 ml-10" onClick={addUser} />
                    </div>
                </div>
                <Link href="/rule">
                    <button className='border rounded-lg bg-blue-400 text-white px-5 py-3 mt-10 items-center justify-center' onClick={() => { localStorage.setItem("persons", JSON.stringify(persons)) }}>
                        Finished adding people
                    </button>
                </Link>
            </main>
        </div>
    )
}
