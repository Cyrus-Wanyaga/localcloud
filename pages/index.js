'use-strict'

import styles from '../styles/Home.module.css'
import {useEffect, useState} from "react";
import Layout from "../components/Layout";

export default function Home() {
    const [directories, setDirectories] = useState(null);
    const [directoryPathName, setDirectoryPathName] = useState("");
    const [files, setFiles] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetchData("");
    }, []);

    const walkDir = (event) => {
        event.preventDefault()
        console.log(event)
        fetchData(event.target.dataset.pathname)
    }

    const fetchData = async (pathname) => {
        setLoading(true)
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        var raw = JSON.stringify({
            "path": pathname
        })

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        }

        await fetch("/api/directoryapis", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setDirectories(data.directories.dirInfo);
                setFiles(data.directories.fileInfo)
                console.log("Wueh :: " + directories[0].directoryPathName)
                const pathName = getDirectoryPathName(directories)
                setDirectoryPathName(pathName)
                setTimeout(() => setLoading(false), 500)
                // setLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            });
    };

    const fetchFileContents = (event) => {
        event.preventDefault()
        console.log(event.target.dataset.pathname)
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        var raw = JSON.stringify({
            "path": event.target.dataset.pathname
        })

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        }

        fetch("/api/directoryapis/readfile", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                alert(data.fileData)
                // setLoading(false)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getDirectoryPathName = (directories) => {
        const directoryPathName = directories[0].directoryPathName
        const splitPathNames = directoryPathName.split("/")
        const lastPathRemoved = splitPathNames.splice(1, splitPathNames.length - 2)
        return "/" + lastPathRemoved.join("/")

    }

    const traverseBack = (event) => {
        event.preventDefault()
        fetchData(directories)
    }

    if (isLoading) return (<div className={"container-fluid d-flex justify-content-center w-100 align-items-center"}
                                style={{height: '100vh'}}>Loading...</div>)

    return (
        <Layout title={"Local Cloud"}>
            <div className={styles.cover}>
                <div className={"container-fluid p-5 w-75"}>
                    <div className={"row d-flex justify-content-center"}>
                        <h1 className={"text-center"}>Local Cloud</h1>
                    </div>
                    <div className={"col-md-12 d-flex align-items-center justify-content-start px-0 mx-4 mt-5"}>
                                    <span
                                        className={styles.back_bg + ` material-symbols-rounded`}
                                        onClick={traverseBack}>arrow_back_ios_new</span>
                        <h3 className={"mx-5"}>{directoryPathName}</h3>
                    </div>
                    {directories.length !== 0 ?
                        (
                            <div className={"row d-flex justify-content-start"}>
                                <h3 className={"mx-4 mt-5"}>Folders</h3>
                                {directories.map((dir, key) => (
                                    <div key={key}
                                         className={styles.folder_icon + ` col-md-3 d-flex justify-content-center align-items-center`}
                                         data-pathname={dir.directoryPathName}
                                         onClick={walkDir}><p>{dir.directory}</p></div>
                                ))}
                            </div>) : <h1>No Data</h1>}
                    {files ?
                        (<div className={"row py-5 d-flex justify-content-start"}>
                            <h3 className={"mb-5 px-0 mx-4"}>Files</h3>
                            {files.map((file, key) => (
                                <div className={styles.folder_icon + ` col-md-3 d-flex align-items-center`} onClick={fetchFileContents}
                                     data-pathname={file.filePathName} key={key}><p>{file.fileName}</p></div>
                            ))}
                        </div>) : null}
                </div>
            </div>
        </Layout>
    )
}
