#!/usr/bin/env bash

DIR=$(dirname "$0")
source ${DIR}/common/logger.sh

dd-oc() {
  local _ns=$(oc project --short=true)

  log-info "oc --namespace ${_ns} $@"
  oc --namespace ${_ns} "$@"
}

get-url() {
  local _app_name=$1

    export URL="http://$(dd-oc get routes -o=jsonpath='{.items[0].spec.host}')"
    echo ${URL}
}
