# Install repositories
helm repo add grafana https://grafana.github.io/helm-charts

helm repo add infisical-helm-charts 'https://dl.cloudsmith.io/public/infisical/helm-charts/helm/charts/'

helm repo add fluent https://fluent.github.io/helm-charts

# create a namespace for grafana loki components
kubectl create ns loki

# Get the latest package versions
helm repo update

### LOKI GRAFANA SETUP ###

# 1. install grafana/loki package with values.yaml as the config file
helm upgrade --install --namespace loki logging grafana/loki -f kubernetes_files/grafana/values.yaml --set loki.auth_enabled=false

# 2. install loki-grafana which is the web portal
helm upgrade --install --namespace=loki loki-grafana grafana/grafana

# 3. extract the default loki-grafana password, base64 encode it as an env variable:
#    ADMIN_AUTH to be used by nginx to authorize fluent-bit access to loki for log-forwarding
ADMIN_PASSWORD=$(kubectl get secret -n loki loki-grafana -o jsonpath="{.data.admin-password}" | base64 --decode)
kubectl create secret generic loki-gateway-auth --from-literal=ADMIN_AUTH=$(echo "admin:${ADMIN_PASSWORD}" | base64)

### FLUENT-BIT SETUP ###
# install fluent-bit with values.yaml as the config file
helm install fluent-bit fluent/fluent-bit -f kubernetes_files/fluent-bit/values.yaml

### INFISICAL SETUP ### 
helm install infisical-secrets-operator infisical-helm-charts/secrets-operator --version=0.3.3 --set controllerManager.manager.image.tag=latest

kubectl create secret generic infisical-service-token --from-literal=infisicalToken=st.3b0c7b00-7985-4ef6-b3db-9d58fd0ef656.d7e1989e312cb70eee81d8faa877fb2e.fb5a00d339af58e65b6a5137c614e311

### APPLY THE CORE COMPONENTS ###
kubectl apply -f kubernetes_files/infisical -f kubernetes_files/nginx -f kubernetes_files/ui -f kubernetes_files/api -f kubernetes_files/db
