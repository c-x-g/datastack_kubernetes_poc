helm uninstall infisical-secrets-operator fluent-bit
helm -n loki uninstall logging loki-grafana

kubectl delete -f kubernetes_files/ui -f kubernetes_files/api -f kubernetes_files/infisical -f kubernetes_files/nginx
kubectl delete -f kubernetes_files/db
kubectl delete secret --field-selector type=Opaque
