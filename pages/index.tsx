import Head from 'next/head';
import { useState, ChangeEvent } from 'react';
import { User } from './components/UserType';
import styles from '../styles/Home.module.css';

type Props = {
    data: User[]
}

export async function getServerSideProps(): Promise<{ props: { data: User[] } }> {
    const result = await fetch('http://localhost:3000/api/get')
    const data: User[] = await result.json();
    return { props: { data } };
}

export default function Home(props: Props) {
    const [user, setUser] = useState<User>({
        id: "",
        firstName: "",
        lastName: "",
        email: ""
    })
    const [users, setUsers] = useState<User[]>(props.data);

    function handleInput(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        setUser((prev) => {
            return ({
                ...prev,
                [name]: value
            })
        })
    }

    async function getUsers(): Promise<void> {
        const data: Response = await fetch('/api/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await data.json();
        console.log(result);
    }

    async function createUser(): Promise<void> {
        const data: Response = await fetch('/api/create-user', {
            method: "POST",
            headers: {
                'Content-Type': 'application-json'
            },
            body: JSON.stringify(user)
        })
        const result: User[] = await data.json();
        setUsers(result);
        console.log("Created a user successfully");
        console.log(users);
    }

    async function deleteUser(): Promise<void> {
        const data: Response = await fetch('/api/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application-json'
            },
            body: JSON.stringify(user)
        });
        const result: User[] = await data.json();
        setUsers(result);
        console.log("deleted a user successfully");
        console.log(users);
    }

    async function updateUser(): Promise<void> {
        const data: Response = await fetch('/api/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application-json'
            },
            body: JSON.stringify(user)
        });
        const result: User[] = await data.json();
        console.log("first")
        console.log(result);
        setUsers(result);
        // console.log('Updated a user info successfully');
        // console.log(users);
    }

    return (
        <>
            <Head>
                <title>Next.js</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className={styles.wrap}>
                    <section className={styles.container}>
                        <h1>Create User</h1>
                        <div>
                            <label htmlFor='firstName' >First Name: </label>
                            <input type="text" name='firstName' value={user.firstName} onChange={(e) => handleInput(e)}></input>
                            <br />
                            <label htmlFor='firstName' >Last Name: </label>
                            <input type="text" name='lastName' value={user.lastName} onChange={(e) => handleInput(e)}></input>
                            <br />
                            <label htmlFor='email' >Email: </label>
                            <input type="email" name='email' value={user.email} onChange={(e) => handleInput(e)}></input>
                            <br />
                            <button className={styles.btn} onClick={() => createUser()}>Create User</button>
                            <button className={styles.btn} onClick={() => getUsers()}>Get Users<br />check console</button>
                        </div>
                    </section>
                    <section className={styles.container}>
                        <h1>Delete User</h1>
                        <div>
                            <label>ID: </label>
                            <input type='text' name='id' value={user.id} onChange={(e) => handleInput(e)}></input>
                            <br />
                            <button className={styles.btn} onClick={() => deleteUser()}>Delete User</button>
                        </div>
                    </section>
                    <section className={styles.container}>
                        <h1>Update User</h1>
                        <div>
                            <label>ID: </label>
                            <input type='text' name='id' value={user.id} onChange={(e) => handleInput(e)}></input>
                            <br />
                            <label htmlFor='firstName' >First Name: </label>
                            <input type="text" name='firstName' value={user.firstName} onChange={(e) => handleInput(e)}></input>
                            <br />
                            <label htmlFor='firstName' >Last Name: </label>
                            <input type="text" name='lastName' value={user.lastName} onChange={(e) => handleInput(e)}></input>
                            <br />
                            <label htmlFor='email' >Email: </label>
                            <input type="email" name='email' value={user.email} onChange={(e) => handleInput(e)}></input>
                            <br />
                            <button className={styles.btn} onClick={() => updateUser()}>Update User</button>
                        </div>
                    </section>
                </div>
                <section>
                    {users.map(user => {
                        return (
                            <div key={user.id} className={styles.container}>
                                <p>ID: {user.id}</p>
                                <p>First Name: {user.firstName}</p>
                                <p>Last Name: {user.lastName}</p>
                                <p>Email: {user.email}</p>
                            </div>
                        )
                    })}
                </section>
            </main>
        </>
    )
}