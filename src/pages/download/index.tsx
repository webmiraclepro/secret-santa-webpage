import Link from 'next/link'
import {useSelector, useDispatch} from 'react-redux'
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { getRules } from '../../state/rule/reducer'
import { RootState, AppDispatch } from '../../state/store'


const DownloadPage = () => {
    const rules = useSelector(({rule}: RootState) => getRules(rule.rules))
    const downloadFile = () => {
        const zip = new JSZip()
        rules.map(({firstPerson, secondPerson, isVerca}, index) => {
            const result = firstPerson + " can't give to " + secondPerson + `${isVerca ? " and vice versa." : "."}`
            const blob = new Blob([result], { type: "text/plain;charset=utf-8"});
            zip.file(`output${index}.txt`, blob);
        })
        zip.generateAsync({type:"blob"}).then(function(content) {
            // see FileSaver.js
            saveAs(content, "secretsanta.zip");
        });
       
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <p className='text-xl text-blue'>Santa has finished deciding who everyone should give secret gifts to!</p>
            <Link href="/download">
                <button className='border rounded-lg bg-blue-400 text-white px-5 py-3 mt-10 items-center justify-center' onClick={downloadFile}>
                    Download SecretSanta.zip
                </button>
            </Link>
        </div>
    )
}

export default DownloadPage