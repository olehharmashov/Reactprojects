import './App.css'
import ProfileCard from './components/ProfileCard.jsx'

const profile = {
  name: 'Олег',
  group: 'КН-312',
  technologies: ['React', 'JavaScript', 'CSS'],
}

function App() {
  return (
    <main>
      <ProfileCard
        name={profile.name}
        group={profile.group}
        technologies={profile.technologies}
      />
    </main>
  )
}

export default App
