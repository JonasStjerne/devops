# DevOps

To deploy a service using the Helm templating add a `<service-name>.values.yaml` file to the `helm` directory.
When deploying to kubernetes install the helm chart using:

`helm install -f <service-name>.values.yaml <service-name> .`

To see running pods in k8 use the `kubectl get pods` command.

To push a new docker image do: `docker push jstjerne/distributed_app:tagname´.
Then change the tagname in the helm chart for the service.
