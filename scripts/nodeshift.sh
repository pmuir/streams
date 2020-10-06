#!/usr/bin/env bash

DIR=$(dirname "$0")
source ${DIR}/common/logger.sh
source ${DIR}/common/util.sh

NODESHIFT_CMD=`pwd`/node_modules/.bin/nodeshift

usage() {
  log-info "Usage: $(basename $0) [deploy|undeploy] <app_name>"
  exit 1
}

APP_NAME=${APP_NAME:-3scale}

NAMESPACE=${NAMESPACE}
if [ -z "${NAMESPACE}" ]; then
  log-err "You have to set NAMESPACE environment variable"
  exit 1
fi

KSVC_NAME=$2
if [ -z "${KSVC_NAME}" ]; then
  log-info "You must specify and app name!"
  usage
fi

deploy() {
  log-info "nodeshift --knative=true --namespace.name=${NAMESPACE}"
  ${NODESHIFT_CMD} --knative=true --namespace.name=${NAMESPACE}
  dd-oc label ksvc/${KSVC_NAME} app.kubernetes.io/part-of=${APP_NAME} --overwrite=true
  dd-oc annotate --overwrite ksvc/${KSVC_NAME} app.openshift.io/connects-to=streams-api
  dd-oc annotate --overwrite ksvc/${KSVC_NAME} autoscaling.knative.dev/minScale=1

  local _latest_rev=$(oc --namespace ${NAMESPACE} get ksvc/${KSVC_NAME} -o=jsonpath='{.status.latestCreatedRevisionName}')
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
