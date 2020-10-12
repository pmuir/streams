#!/usr/bin/env bash

DIR=$(dirname "$0")
source ${DIR}/common/logger.sh
source ${DIR}/common/util.sh

usage() {
  log-info "Usage: $(basename $0) [deploy|undeploy] <service_name>"
  exit 1
}

NODESHIFT_CMD=`pwd`/node_modules/.bin/nodeshift
APP_NAME=${APP_NAME:-ums-poc}

KSVC_NAME=$2
if [ -z "${KSVC_NAME}" ]; then
  log-info "You must specify and service name!"
  usage
fi

deploy() {
  local _ns=$(oc project --short=true)

  log-info "nodeshift --knative=true --namespace.name=${_ns}"
  ${NODESHIFT_CMD} --knative=true --namespace.name=${_ns} --quiet=false

  dd-oc label ksvc/${KSVC_NAME} app.kubernetes.io/part-of=${APP_NAME} --overwrite=true
  kn service update ${KSVC_NAME} --min-scale 1

  local _latest_rev=$(oc --namespace ${_ns} get ksvc/${KSVC_NAME} -o=jsonpath='{.status.latestCreatedRevisionName}')
  dd-oc label rev/${_latest_rev} app.openshift.io/runtime=nodejs --overwrite=true
}

undeploy() {
    dd-oc delete service.serving.knative.dev/${KSVC_NAME}
}

# execute
case $1 in
  deploy)
    deploy
  ;;
  undeploy)
    undeploy
  ;;
  *)
    usage
  ;;
esac
