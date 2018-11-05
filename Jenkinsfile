def getBackendHost(branch) {
  if (branch == 'master') {
    return 'https://api.tokenadmin.work/v0'
  } else {
    return 'https://api-staging.tokenadmin.work/v0'
  }
}

def getBucket(branch) {
  if (branch == 'master') {
    return 'tokenadmin.work'
  } else {
    return 'test.tokenadmin.work'
  }
}

pipeline {
  agent any
  environment {
    backendHost = getBackendHost(env.BRANCH_NAME)
    bucketName = getBucket(env.BRANCH_NAME)
  }
  stages {
    stage('Build Docker Image') {
      when {
        anyOf {
          branch 'master'
          branch 'staging'
	}
      }
      steps {
        sh 'docker build -t noel/tokenbase .'
      }
    }
    stage('Run Build') {
      when {
        anyOf {
          branch 'master'
          branch 'staging'
	}
      }
      steps {
        sh 'docker run --name noel-tokenbase -e BACKEND_HOST:' + backendHost + ' noel/tokenbase'
        sh 'docker cp noel-tokenbase:/app/build .'
        sh 'docker rm noel-tokenbase'
        sh 'docker rmi noel/tokenbase'
      }
    }
    stage('Deploy to S3') {
      when {
        anyOf {
          branch 'master'
          branch 'staging'
	}
      }
      steps {
          withAWS(credentials:'james-aws', region: 'ap-northeast-2') {
          s3Upload(bucket: bucketName, path: '', includePathPattern: '**/*', workingDir: 'build')
        }
      }
    }
  }
}
