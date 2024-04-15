import { useState } from 'react';
import './App.css'
import { CV } from './CV/Cv'
import { Education, Experience, Habilities, Languages, Me, SobreMi } from './components/';

const { me, education, experience, languages, habilities } = CV;


function App() {
  const [showEducation, setShowEducation] = useState(true);

    return (
      <>
        <Me me={me}/>
        

        <SobreMi me={me} />
        <div className='center'>
          <button
            className='btn'
            onClick={() => setShowEducation(true)}
          >
          Estudios
          </button>
          <button
            className='btn'
            onClick={() => setShowEducation(false)}
          >
            Experiencia
          </button>
        </div>
        <div>
          {showEducation ? (
            <Education education={education} />
          ) : (
            <Experience experience={experience} />
          )}
        </div>
        <Languages languages={languages} />
        <Habilities habilities={habilities} />

        
      </>
    )
}

export default App
