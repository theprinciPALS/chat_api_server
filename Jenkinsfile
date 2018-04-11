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
        script {
          if(env.BRANCH_NAME == 'master') {
            echo 'Docker building!'
            sh 'docker build . -t principals/chat_api_server'
            sh 'docker push principals/chat_api_server'
            sh 'source ~/.bash_profile; aws elasticbeanstalk update-environment --application-name chat_api_server --environment-name chat-api-server-prod-2 --version-label chat_api_server_1'
          }
        }
      }
    }
  }
}
