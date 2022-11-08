import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { getRules } from '../../state/rule/reducer'
import { getPersons } from '../../state/person/reducer';
import { RootState, AppDispatch } from '../../state/store'


const DownloadPage = () => {
    const rules = useSelector(({ rule }: RootState) => getRules(rule.rules))
    const persons = useSelector(({ people }: RootState) => getPersons(people.persons))
    const downloadFile = () => {
        const zip = new JSZip()
        let map = new Map<string, Array<string>>();
        rules.map(({ firstPerson, secondPerson, isVerca }, index) => {
            let arr = map.get(firstPerson) as Array<string>
            if (!arr) arr = []
            arr.push(secondPerson)
            map.set(firstPerson, arr)
            if (isVerca) {
                arr = map.get(secondPerson) as Array<string>
                if (!arr) arr = []
                arr.push(firstPerson)
                map.set(secondPerson, arr)
            }
        })

        for (const { name } of persons) {
            const relation = map.get(name) as Array<string> ?? []
            relation.push(name)
            const canGive = persons.filter((person) => {
                return !relation.includes(person.name)
            })
            let result = name + ", you are giving a present to "
            canGive.map(({ name }, id) => {
                if (id) result += ","
                result += name
            })
            result += '.'
            const blob = new Blob([result], { type: "text/plain;charset=utf-8" });
            zip.file(`${name}.txt`, blob);
        }
        zip.generateAsync({ type: "blob" }).then(function (content) {
            // see FileSaver.js
            saveAs(content, "secretsanta.zip");
        });

    }

    return (
        <div className='flex flex-col justify-center items-center text-blue-400'>
            <p className='text-xl'>Santa has finished deciding who everyone should give secret gifts to!</p>
            <Link href="/download">
                <button className='border rounded-lg bg-blue-400 text-white px-5 py-3 mt-10 items-center justify-center' onClick={downloadFile}>
                    Download SecretSanta.zip
                </button>
            </Link>
            <Link href="/">
                <button className='border rounded-lg bg-blue-400 text-white px-5 py-3 mt-10 items-center justify-center'>
                    Go back and start a new Secret Santa list
                </button>
            </Link>
        </div>
    )
}

export default DownloadPage