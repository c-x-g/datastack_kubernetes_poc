helm uninstall infisical-secrets-operator fluent-bit
helm -n loki uninstall logging loki-grafana
helm -n ingress-nginx uninstall ingress-nginx
helm -n monitoring uninstall prometheus

kubectl delete ns loki ingress-nginx monitoring

kubectl delete -f kubernetes_files/ui -f kubernetes_files/api -f kubernetes_files/db -f kubernetes_files/infisical -f kubernetes_files/nginx -f kubernetes_files/ingress 
kubectl delete secret --field-selector type=Opaque
