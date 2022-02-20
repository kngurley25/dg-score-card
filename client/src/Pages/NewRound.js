import React from "react";

const NewRound = () => {
    return (
        <main>
            <div>
                <h2> Start a new round! </h2>
                <form>
                    <input 
                          className='form-input'
                          placeholder='course name'
                          name='course'
                          type='course'
                          id='course'
                          />

                    
            <button type='submit'>
                Submit
              </button>
                </form>
            </div>
        </main>
    )
}

export default NewRound;