import React from 'react'
import {
  BrowserRouter as Router,Routes,Route
} from 'react-router-dom';
import { Home } from './Home.jsx'
import { Login } from './Login.jsx'
import { UnderConstruction } from './UnderConstruction'
import { Instructions } from './Course_Review_Process/Instructions'
import { ChallengesConcerns } from './Course_Review_Process/ChallengesConcerns'
import { CourseKeyIndicatersSecond } from './Course_Review_Process/CourseKeyIndicatersSecond'
import { CourseImprovementPlan } from './Course_Review_Process/CourseImprovementPlan'
import { CourseKeyIndicaters } from './Course_Review_Process/CourseKeyIndicaters'
import { CourseReflectionForm } from './Course_Review_Process/CourseReflectionForm'
import { ReviewersFeedback } from './Course_Review_Process/ReviewersFeedback'
import { Weektoweekactivity } from './Course_Review_Process/Weektoweekactivity'
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/Login" />} />
          <Route path="/home" element={<Navigate to="/Login" />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Dashboard" element={<Home />} />
          <Route path="/Instructions" element={<Instructions />} />
          <Route path="/UnderConstruction" element={<UnderConstruction />} />
          <Route path="/ChallengesConcerns" element={<ChallengesConcerns />} />
          <Route path="/CourseKeyIndicatersSecond" element={<CourseKeyIndicatersSecond />} />
          <Route path="/CourseImprovementPlan" element={<CourseImprovementPlan />} />
          <Route path="/CourseKeyIndicaters" element={<CourseKeyIndicaters />} />
          <Route path="/CourseReflectionForm" element={<CourseReflectionForm />} />
          <Route path="/ReviewersFeedback" element={<ReviewersFeedback />} />
          <Route path="/Weektoweekactivity" element={<Weektoweekactivity />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
