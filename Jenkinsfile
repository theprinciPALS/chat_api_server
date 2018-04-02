pipeline {
  agent any
  stages {
    stage('Test') {
      steps {
        echo 'Testing...'
        sh 'npm install --save'
        sh 'npm test'
      }
    }
    stage('Build') {
      steps {
        if(env.BRANCH_NAME == 'master') {
          echo 'Docker building!'
          sh 'docker build .'
          sh 'docker push principals/jenkinsdemo'
        }
      }
    }
  }
}
