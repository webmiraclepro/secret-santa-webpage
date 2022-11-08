import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { saveAs } from 'file-saver';
import JSZip, { file } from 'jszip';
import { getRules } from '../../state/rule/reducer'
import { getPersons } from '../../state/person/reducer';
import { RootState, AppDispatch } from '../../state/store'


const DownloadPage = () => {
    const rules = useSelector(({ rule }: RootState) => getRules(rule.rules))
    const persons = useSelector(({ people }: RootState) => getPersons(people.persons))
    const downloadFile = () => {
        const zip = new JSZip()
        rules.map(({ firstPerson, secondPerson, isVerca }, index) => {
            let result: string = ""
            persons.filter(function ({ id, name }) {
                return name !== secondPerson
            }).map(({ id, name }) => {
                const fileContent = firstPerson + ", you are giving a present to " + name + ".\n";
                result += fileContent
            })
            // result = firstPerson + " can't give to " + secondPerson + `${isVerca ? " and vice versa." : "."}`
            const blob = new Blob([result], { type: "text/plain;charset=utf-8" });
            zip.file(`${firstPerson}.txt`, blob);
        })
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