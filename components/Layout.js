import React from 'react'
import Head from "next/head";


class Layout extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <title>{this.props.title}</title>

                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
                </Head>
                {this.props.children}
            </div>
        )
    }
}

export default Layout;