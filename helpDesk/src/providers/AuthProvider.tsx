import React, { createContext, useContext, useState, useEffect } from 'react'
import { Key } from '../constants/Keys'
import { Storage } from '../utils'
import { getDataFromStorage, storeDataToStorage } from '../utils/storage'

const AuthContext = createContext({})

function AuthProvider({ children }: any) {
  const [user, setUser] = useState<null>()

  useEffect(() => {
    getUser()
  }, [])


  useEffect(() => {
    const storeUserDetail = async () => {
      if (user) {
        await storeDataToStorage(Key.user, user)
      }
    }
    storeUserDetail()
  }, [user])

  const getUser = async () => {
    const localUser = await getDataFromStorage(Key.user)
    if (localUser) {
      setUser(localUser)
    }
  }

  const saveUser = async (userObject: any) => {
    setUser(userObject)
  }

  const deleteUser = async () => {
    setUser(null)
    await Storage.removeDataFromStorage(Key.user)
    await Storage.removeDataFromStorage(Key.token)
  }

  const login = async (userDetail: any) => saveUser(userDetail)
  const logout = async () => deleteUser()

  return <AuthContext.Provider value={{ user, login, saveUser, logout }}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider } 
