export const serviceStatuses = [
  { id: 'submitted', label: 'Request submitted' },
  { id: 'assigned', label: 'Technician assigned' },
  { id: 'on-way', label: 'On the way' },
  { id: 'repairing', label: 'Repair in progress' },
  { id: 'completed', label: 'Completed' },
]

export const cancelledStatus = { id: 'cancelled', label: 'Cancelled' }

export function getStatusIndex(statusId) {
  return serviceStatuses.findIndex((status) => status.id === statusId)
}

export function getStatusLabel(statusId) {
  if (statusId === cancelledStatus.id) {
    return cancelledStatus.label
  }

  return serviceStatuses.find((status) => status.id === statusId)?.label || statusId
}

export function getNextStatus(statusId) {
  const currentIndex = getStatusIndex(statusId)
  if (currentIndex === -1 || currentIndex === serviceStatuses.length - 1) {
    return null
  }

  return serviceStatuses[currentIndex + 1]
}
