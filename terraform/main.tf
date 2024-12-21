terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.3.0"
}

provider "google" {
  project = "onyx-dragon-445317-g5"  # Reemplaza con tu ID de proyecto
  region  = "us-central1"   
  zone    = "us-central1-a"
}

resource "google_container_cluster" "primary" {
  name     = "cloud-station-cluster"
  location = "us-central1-a"

  remove_default_node_pool = true # Elimina el pool por defecto
  initial_node_count       = 1   # Requerido, pero ignorado al quitar el default pool

  network = "default" # Usa la red por defecto
}

resource "google_container_node_pool" "nodes" {
  name       = "mi-nodo-pool"
  location   = "us-central1-a"
  cluster    = google_container_cluster.primary.name
  node_count = 1

  node_config {
    preemptible  = true             
    machine_type = "e2-micro"       
    disk_size_gb = 10
    disk_type    = "pd-standard"    # Cambia a disco estándar (evita SSD)

    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
  }
}

output "kubernetes_cluster_name" {
  value = google_container_cluster.primary.name
}

output "endpoint" {
  value = google_container_cluster.primary.endpoint
}

output "ca_certificate" {
  value = google_container_cluster.primary.master_auth[0].cluster_ca_certificate
}
