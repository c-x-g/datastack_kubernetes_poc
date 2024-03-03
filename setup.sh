### CREATE SEPARATE NAMESPACES ### 
kubectl create ns loki 
kubectl create ns ingress-nginx 
kubectl create ns monitoring

#################################################################################

### INSTALL REPOSITORIES ### 
helm repo add grafana https://grafana.github.io/helm-charts

helm repo add infisical-helm-charts 'https://dl.cloudsmith.io/public/infisical/helm-charts/helm/charts/' 

helm repo add fluent https://fluent.github.io/helm-charts

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx

# Get the latest package versions
helm repo update

#################################################################################

### LOKI GRAFANA SETUP ###

# 1. install grafana/loki package with values.yaml as the config file
helm upgrade --install --namespace loki logging grafana/loki -f helm_config/grafana/values.yaml --set loki.auth_enabled=false

# 2. install loki-grafana which is the web portal
helm upgrade --install --namespace=loki loki-grafana grafana/grafana

# 3. extract the default password
# kubectl get secret -n loki loki-grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo

# 4. open the port 3000 on localhost to access the loki-grafana web portal
# make sure no other application is currently listening on that port or use a
# different one
# kubectl port-forward --namespace loki service/loki-grafana 3000:80

# 5. Login to the web portal using username admin and password from step 4

#################################################################################

### FLUENT-BIT SETUP ###
# install fluent-bit with values.yaml as the config file
helm install fluent-bit fluent/fluent-bit -f helm_config/fluent-bit/values.yaml

#################################################################################

### INFISICAL SETUP ### 
helm install --generate-name infisical-helm-charts/secrets-operator --version=0.3.3 --set controllerManager.manager.image.tag=latest

kubectl create secret generic infisical-service-token --from-literal=infisicalToken=st.3b0c7b00-7985-4ef6-b3db-9d58fd0ef656.d7e1989e312cb70eee81d8faa877fb2e.fb5a00d339af58e65b6a5137c614e311

#################################################################################

### PROMETHEUS SETUP ###

helm install prometheus prometheus-community/prometheus -n monitoring

#################################################################################

### FETCH ADMIN AUTH FROM GRAFANA ### 
kubectl create secret generic loki-gateway-auth --from-literal=ADMIN_AUTH=$(kubectl get secret -n loki loki-grafana -o jsonpath="{.data.admin-password}" | base64 --decode)

#################################################################################

### INGRESS SETUP ###
helm install -f helm_config/ingress-nginx/values.yaml -n ingress-nginx ingress-nginx ingress-nginx/ingress-nginx

#################################################################################

### APPLY THE CORE COMPONENTS ###
kubectl apply -f kubernetes_files/infisical -f kubernetes_files/nginx -f kubernetes_files/ui -f kubernetes_files/api -f kubernetes_files/db -f kubernetes_files/ingress


