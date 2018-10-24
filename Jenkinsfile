def getBackendHost(branch) {
  if (branch == 'master') {
    return 'https://api.tokenadmin.work'
  } else {
    return 'https://api-test.tokenadmin.work'
  }
}

def getBucket(branch) {
  if (branch == 'master') {
    // return 'tokenadmin.work'
    return 'test.tokenadmin.work'
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
        sh 'docker build -t noel/tokenadmin .'
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
        sh 'docker run --name noel-tokenadmin -e BACKEND_HOST:' + backendHost + ' noel/tokenadmin'
        sh 'docker cp noel-tokenadmin:/app/build .'
        sh 'docker rm noel-tokenadmin'
        sh 'docker rmi noel/tokenadmin'
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
