import { useState } from "react"
import { Link } from "react-router-dom"
import "./RegForm.css"
import { fetchReg } from "../../../fetch/fetchReg"

function RegForm() {

    const [surname, setSurname] = useState('')
    const [name, setName] = useState('')
    const [secondName, setSecondName] = useState('')
    const [phone, setPhone] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')

    const handleSurname = (e) => { setSurname(e.target.value) }
    const handleName = (e) => { setName(e.target.value) }
    const handleSecondName = (e) => { setSecondName(e.target.value) }
    const handlePhone = (e) => { setPhone(e.target.value) }
    const handleLogin = (e) => { setLogin(e.target.value) }
    const handlePassword = (e) => { setPassword(e.target.value) }

    const  submitForm = async (e) => {
        e.preventDefault()

        if (!surname || !name || !secondName || !phone || !login || !password) {
            setErr('Все поля должны быть заполнены')
        }

        const newUser = {
            id: Date.now(),
            id_role: 1,
            full_name: name +" "+ surname +" "+ secondName,
            phone: phone,
            login: login,
            password: password
        }

        const result = await fetchReg(newUser);

        if (result.success) {
            console.log("Усешная регистрация");
            navigate('/aut')
        } else {
            console.log("Ошибка");
        }
    }

    return (
        <div className="regFormFull">
            <h2>Регистрация</h2>
            <form action="" className="fullInput" onSubmit={submitForm}>
                {err && <span className="err">{err}</span>}
                <div className="input">
                    <label htmlFor="">Фамилия</label>
                    <input type="text" value={surname} onChange={handleSurname} />
                </div>

                <div className="input">
                    <label htmlFor="">Имя</label>
                    <input type="text" value={name} onChange={handleName} />
                </div>

                <div className="input">
                    <label htmlFor="">Отчество</label>
                    <input type="text" value={secondName} onChange={handleSecondName} />
                </div>

                <div className="input">
                    <label htmlFor="">Телефон</label>
                    <input type="text" value={phone} onChange={handlePhone} />
                </div>

                <div className="input">
                    <label htmlFor="">Логин</label>
                    <input type="text" value={login} onChange={handleLogin} />
                </div>

                <div className="input">
                    <label htmlFor="">Пароль</label>
                    <input type="password" value={password} onChange={handlePassword} />
                </div>

                <button type="submit" className="buttonReg">Зарегестрироваться</button>
                <Link to={'/aut'} >Перейти к авторизации</Link>
            </form>
        </div>
    )
}

export default RegForm