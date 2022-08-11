{{/*
Expand the name of the chart.
*/}}
{{- define "fileimport_service.name" -}}
{{- default "speckle-fileimport-service" .Values.fileimport_service.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "fileimport_service.fullname" -}}
{{- if .Values.fileimport_service.fullnameOverride }}
{{- .Values.fileimport_service.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default "speckle-fileimport-service" .Values.fileimport_service.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "fileimport_service.labels" -}}
helm.sh/chart: {{ include "speckle.chart" . }}
{{ include "fileimport_service.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/component: {{ include "fileimport_service.name" . }}
app.kubernetes.io/part-of: {{ include "speckle.name" . }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "fileimport_service.selectorLabels" -}}
app.kubernetes.io/name: {{ include "fileimport_service.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "fileimport_service.serviceAccountName" -}}
{{- if .Values.fileimport_service.serviceAccount.create }}
{{- default (include "fileimport_service.fullname" .) .Values.fileimport_service.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.fileimport_service.serviceAccount.name }}
{{- end }}
{{- end }}
