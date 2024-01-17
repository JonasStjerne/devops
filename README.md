# DevOps

To push a new docker image do: `docker push jstjerne/distributed_app:tagname´.

Then change the tagname in the helm chart for the service.

To deploy a service using the Helm templating add a `<service-name>.values.yaml` file to the `helm` directory.
When deploying to Kubernetes install the helm chart by cd into the helm directory and running:

`helm install -f <service-name>.values.yaml <service-name> .`

To see running pods in k8 use the `kubectl get pods` command.

To forward ports to local machine use command:
`kubectl --namespace default port-forward $POD_NAME 8080:8080`

To run kafka:
`helm install my-kafka bitnami/kafka --version 26.4.2`

To Run kafka-ui:
`helm install my-kafka-ui kafka-ui/kafka-ui --version 0.7.5`

To create a pod that you can use as a Kafka client run the following commands:

```
    kubectl run my-kafka-client --restart='Never' --image docker.io/bitnami/kafka:3.6.0-debian-11-r2 --namespace default --command -- sleep infinity
    kubectl cp --namespace default /path/to/client.properties my-kafka-client:/tmp/client.properties
    kubectl exec --tty -i my-kafka-client --namespace default -- bash
```

```
    PRODUCER:
        kafka-console-producer.sh \
            --producer.config /tmp/client.properties \
            --broker-list my-kafka-controller-0.my-kafka-controller-headless.default.svc.cluster.local:9092,my-kafka-controller-1.my-kafka-controller-headless.default.svc.cluster.local:9092,my-kafka-controller-2.my-kafka-controller-headless.default.svc.cluster.local:9092 \
            --topic test
```

```
    CONSUMER:
        kafka-console-consumer.sh \
            --consumer.config /tmp/client.properties \
            --bootstrap-server my-kafka.default.svc.cluster.local:9092 \
            --topic test \
            --from-beginning
```

To start kafka and kafka ui run: `docker-compose -f kafka-ui.yaml up`
Kafka ui will be available on port 8080.

To open Prisma studio run `npx prisma studio`

## Argo CD

Argo CD is used to deploy and manage state of the Kubernetes cluster. To setup the Argo CD follow the [getting started guide](https://argo-cd.readthedocs.io/en/stable/getting_started/).
Argo CD will apply the Helm Charts to the cluster. Also, Argo CD should be used to watch the container registries for new image tags and commit the declaration for using the new image tag to the Helm Chart.
https://argocd-image-updater.readthedocs.io/en/stable/basics/update-methods/

### Setting up ArgoCD

Using the `install.yaml` file in the helm directory, ArgoCD can be deployed to the cluster.
Use the command `kube apply -n default -f install.yaml` to apply the installation to the cluster.

Then expose the API server using `kubectl port-forward svc/argocd-server -n default 8080:443`

The UI will now be accessible at `https://localhost:8080`

Default password for the `admin` user is auto-generated. To get the password use the command `argocd admin initial-password -n default`. The password only needs to be used for the initial login.
