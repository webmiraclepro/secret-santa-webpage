
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
                            <div className='flex flex-col my-5 text-blue-400' key={id}>
                                <p className="text-md py-2">Person#{index + 1}</p>
                                <div className='flex flex-row items-center justify-between justify-center'>
                                    <input type="text" className="rounded-lg border border-blue-400 bg-blue-50 p-3" value={name} />
                                    <MinusCircleIcon className="cursor-pointer w-5 h-5 text-blue-400" onClick={() => removeUser(id)} />
                                </div>
                            </div>
                        )
                    })
                }

                <div className='flex flex-col my-5 text-blue-400'>
                    <p className="text-md py-2">Person#{persons.length + 1}</p>
                    <div className='flex flex-row items-center justify-between justify-center'>
                        <input type="text" className="rounded-lg border border-blue-400 bg-blue-50 p-3" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                        <PlusCircleIcon className="cursor-pointer w-5 h-5 text-blue-400 ml-6" onClick={addUser} />
                    </div>
                </div>
                <Link href="/rule">
                    <button className='border rounded-lg bg-blue-400 text-white px-5 py-3 mt-10 items-center justify-center'>
                        Finished adding people
                    </button>
                </Link>
            </main>
        </div>
    )
}
