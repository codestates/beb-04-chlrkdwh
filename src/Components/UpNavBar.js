import styles from './UpNavBar.module.css'

const UpNavBar = () => {

    return (
        <nav className={styles.upNavContainer}>
            {/* Logo */}
            <div className={styles.logoContainer}>
                <div>
                    <img lat="OpenSea logo" src='https://static.opensea.io/Logos/opensea-pride.svg' style={{ width: '40px', height: '4opx' }}></img>
                </div>
                <sapn className={styles.logoName}>OpenSea</sapn>
            </div>
            {/* Input */}
            <div>
                <input></input>
            </div>
            {/* Menu */}
                <div className={styles.menu}><p className={styles.materialSymbolsOutlined}>menu</p></div>
            <ul className={styles.uonorderedList}>
                {/* <ul className={styles.ulFlexible}> */}
                    <div><p>Explore</p></div>
                    <div><p>Stats</p></div>
                    <div><p>Resources</p></div>
                    <div><p>Create</p></div>
                    <div><p>Profile</p></div>
                    <div><p>wallet</p></div>
                {/* </ul> */}
            </ul>
        </nav>
    )
}



export default UpNavBar