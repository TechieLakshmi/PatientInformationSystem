pipeline {
    agent any
    stages{
    stage('Security testing Using SonarQube'){
                steps{
                    dir('PatientRegistration'){
                    nodejs(nodeJSInstallationName:'nodejs'){
                        bat "npm install"
                        withSonarQubeEnv("sonar"){
                        bat "npm install sonar-scanner"
                        bat "npm run sonar"
                        }
                    }
                }
            }
            }
       
    
        stage ('Containers starting') {
            steps {
                echo 'Spinning up the containers'
                bat 'docker-compose build'
                bat 'docker-compose up -d'
            }      
        }
        stage('MicroServices Parallel startup') {


            parallel {


                stage('Authentication') {
                    steps {
                        dir('Authetication'){
                        echo 'Authentication starting up'
                        bat 'npm install' 
                        }
                    }
                }
           
                stage ('Patient Registration') {
                    steps {
                        dir('PatientRegistration'){
                        echo 'Patient Registration Service starting up'
                        bat 'npm install'
                        }
                    }
                }
                stage ('Ward Manager starting up') {
                    steps {
                        dir('WardManager'){
                        echo 'Ward manager services starting up'
                        bat 'npm install'
                        }
                    }
                }
            }      
        }
                stage('Unit Testing - Chai/Mocha') {
            steps {   
                   dir('PatientRegistration') {
                                script {
                                echo 'PIS Testing with Chai/Mocha'
                                bat "npm install --save-dev mocha chai"
                                bat "npm run test"
                                // bat 'npm test'
                                    }
                                }
                    }
        }             

        stage('Microservices containers build') {
                steps {
                     dir('PatientRegistration') {
                    script {
                    echo 'Spinning down running containers'
                    
                    bat 'docker-compose down'
                
                    echo 'Spinning up the containers'
                    bat 'docker-compose build'
                    }
                    }
                }}


        stage('deploy') {
            steps {
                 dir('PatientRegistration') {
                script {
                bat 'docker-compose up -d'
                echo 'MicroServices are being deployed in Dockers'
                    }
                }
            }}
    }
        post {
            always {
                echo 'Pipeline executed.'
            }
            success {
                echo 'All stages completed.'
            }
            unstable {
                echo 'Stages are inconsistent'
            }
            failure {
                echo 'Pipeline Failed'
            }
            changed {
                echo 'Changes detected..'
            }
        }
}
 
