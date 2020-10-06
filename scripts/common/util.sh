#!/usr/bin/env bash

DIR=$(dirname "$0")
source ${DIR}/common/logger.sh

dd-oc() {
    log-info "oc --namespace ${NAMESPACE} $@"
    oc --namespace ${NAMESPACE} "$@"
}

get-url() {
  local _app_name=$1

    export URL="http://$(dd-oc get routes -o=jsonpath='{.items[0].spec.host}')"
    echo ${URL}
}
