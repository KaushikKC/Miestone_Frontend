import React, { useState } from 'react'
import { Button } from '@nextui-org/react'

function CreateProfile() 
{
 const [checkUser, setCheckUser]= useState()
 
  return (
    <div>
      <div>
        <h1>Create Profile</h1>
      </div>
      <Button onPress={() => setCheckUser("Owner")} >Owner</Button>
      <Button onPress={() => setCheckUser("User")}>User</Button>
      {
        checkUser == "Owner" &&  (<>
        

        </>) 
      }
      {
        checkUser == "User" && (
          <>

          </>
        )
      }
    </div>
  )
}

export default CreateProfile