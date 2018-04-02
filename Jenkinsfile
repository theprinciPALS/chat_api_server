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
    if(env.BRANCH_NAME == 'master') {
      stage('Build') {
        steps {
          echo 'Docker building!'
          sh 'docker build .'
          sh 'docker push principals/jenkinsdemo'
        }
      }
    }
  }
}
