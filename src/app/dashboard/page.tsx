"use client"
import { useState, useEffect } from "react"
import { Camera, Save, Trash2, RefreshCw, FileImage, ExternalLink, BarChart } from "lucide-react"
import styles from "./dashboard.module.css"

interface LogData {
  appIniciado: number
  fotosSalvas: number
  fotosDescartadas: number
  logs: {
    event: string
    action: string
    timestamp: string
  }[]
}

interface PhotosData {
  imageUrls: string[]
}

export default function Dashboard() {
  const [logData, setLogData] = useState<LogData | null>(null)
  const [photosData, setPhotosData] = useState<PhotosData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      const logsResponse = await fetch("/api/logs")
      if (!logsResponse.ok) {
        throw new Error(`Erro ao carregar logs: ${logsResponse.status}`)
      }
      const logsData = await logsResponse.json()

      const photosResponse = await fetch("/api/logs/photos")
      if (!photosResponse.ok) {
        throw new Error(`Erro ao carregar fotos: ${photosResponse.status}`)
      }
      const photosData = await photosResponse.json()

      setLogData(logsData)
      setPhotosData(photosData)
    } catch (err) {
      console.error("Erro ao carregar dados:", err)
      setError(err instanceof Error ? err.message : "Erro desconhecido")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date)
  }

  const getFileNameFromUrl = (url: string) => {
    try {
      const urlObj = new URL(url)
      const pathParts = urlObj.pathname.split("/")
      return pathParts[pathParts.length - 1]
    } catch (err) {
      return "imagem.png"
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerFlex}>
            <div className={styles.titleWrapper}>
              <div className={styles.iconWrapper}>
                <BarChart className={styles.icon} />
              </div>
              <h1 className={styles.title}>Photo Opp - Dashboard</h1>
            </div>
            <button className={styles.refreshButton} onClick={fetchData}>
              <RefreshCw className={styles.refreshIcon} />
              Atualizar Dados
            </button>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {error && (
          <div className={styles.error}>
            <div className={styles.errorContent}>
              <div className={styles.errorIcon}>
                <svg
                  className={styles.errorIconSvg}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className={styles.errorMessage}>
                <h3 className={styles.errorTitle}>Erro ao carregar dados</h3>
                <div className={styles.errorText}>
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={styles.statsGrid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Aplicativo Iniciado</h3>
              <div className={styles.cardIconBlue}>
                <Camera />
              </div>
            </div>
            <div className={styles.cardBody}>
              {loading ? (
                <div className={styles.skeletonLoader} />
              ) : (
                <div className={styles.cardValue}>{logData?.appIniciado || 0}</div>
              )}
              <p className={styles.cardDescription}>Total de sessões iniciadas</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Fotos Salvas</h3>
              <div className={styles.cardIconGreen}>
                <Save />
              </div>
            </div>
            <div className={styles.cardBody}>
              {loading ? (
                <div className={styles.skeletonLoader} />
              ) : (
                <div className={styles.cardValue}>{logData?.fotosSalvas || 0}</div>
              )}
              <p className={styles.cardDescription}>Total de imagens salvas</p>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Fotos Descartadas</h3>
              <div className={styles.cardIconRed}>
                <Trash2 />
              </div>
            </div>
            <div className={styles.cardBody}>
              {loading ? (
                <div className={styles.skeletonLoader} />
              ) : (
                <div className={styles.cardValue}>{logData?.fotosDescartadas || 0}</div>
              )}
              <p className={styles.cardDescription}>Total de imagens descartadas</p>
            </div>
          </div>
        </div>

        {/* Tabela de Imagens */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderTitle}>
              <div className={styles.tableIconIndigo}>
                <FileImage />
              </div>
              <h3 className={styles.tableTitle}>Lista de Imagens</h3>
            </div>
            <div className={styles.tableCount}>
              {!loading && photosData?.imageUrls && `Total: ${photosData.imageUrls.length} imagens`}
            </div>
          </div>
          <div className={styles.tableContent}>
            {loading ? (
              <div className={styles.skeletonContainer}>
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className={styles.skeletonLoader}
                    style={{ height: "4rem", width: "100%", marginBottom: "1rem" }}
                  />
                ))}
              </div>
            ) : photosData?.imageUrls.length ? (
              <div className={styles.tableWrapper}>
                <div className={styles.tableContainer}>
                  <table className={styles.table}>
                    <thead className={styles.tableHead}>
                      <tr>
                        <th className={styles.tableHeadCell} style={{ width: "5rem" }}>
                          Nº
                        </th>
                        <th className={styles.tableHeadCell}>Arquivo</th>
                        <th className={styles.tableHeadCell} style={{ textAlign: "right" }}>
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                      {photosData?.imageUrls.map((url, index) => (
                        <tr key={index} className={styles.tableRow}>
                          <td className={`${styles.tableCell} ${styles.tableCellMedium}`}>{index + 1}</td>
                          <td className={`${styles.tableCell} ${styles.tableCellRegular}`}>
                            <div className={styles.imageContainer}>
                              <div className={styles.imageThumb}>
                                <img
                                  src={url || "/placeholder.svg"}
                                  alt={`Imagem ${index + 1}`}
                                  onError={(e) => {
                                    e.currentTarget.src = "/api/placeholder/48/48"
                                  }}
                                />
                              </div>
                              <span className={styles.fileName}>{getFileNameFromUrl(url)}</span>
                            </div>
                          </td>
                          <td className={styles.tableCell} style={{ textAlign: "right" }}>
                            <a href={url} target="_blank" rel="noopener noreferrer" className={styles.viewButton}>
                              Visualizar
                              <ExternalLink />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className={styles.emptyState}>
                <FileImage className={styles.emptyStateIcon} />
                <p className={styles.emptyStateTitle}>Nenhuma imagem encontrada</p>
                <p className={styles.emptyStateText}>As imagens capturadas aparecerão aqui</p>
              </div>
            )}
          </div>
        </div>

        {logData?.logs && logData.logs.length > 0 && (
          <div className={styles.tableCard}>
            <div className={styles.tableHeader}>
              <div className={styles.tableHeaderTitle}>
                <div className={styles.tableIconPurple}>
                  <RefreshCw />
                </div>
                <h3 className={styles.tableTitle}>Histórico de Ações</h3>
              </div>
              <div className={styles.tableCount}>
                {!loading && logData?.logs && `Total: ${logData.logs.length} registros`}
              </div>
            </div>
            <div className={styles.tableContent}>
              <div className={styles.tableWrapper}>
                <div className={styles.tableContainer}>
                  <table className={styles.table}>
                    <thead className={styles.tableHead}>
                      <tr>
                        <th className={styles.tableHeadCell}>Evento</th>
                        <th className={styles.tableHeadCell}>Ação</th>
                        <th className={styles.tableHeadCell}>Data/Hora</th>
                      </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                      {logData.logs.map((log, index) => (
                        <tr key={index} className={styles.tableRow}>
                          <td className={styles.tableCell}>
                            <span className={log.event === "fotoTirada" ? styles.badgeBlue : styles.badgeGray}>
                              {log.event}
                            </span>
                          </td>
                          <td className={styles.tableCell}>
                            {log.action ? (
                              <span
                                className={
                                  log.action === "salvar"
                                    ? styles.badgeGreen
                                    : log.action === "descartar"
                                      ? styles.badgeRed
                                      : styles.badgeGray
                                }
                              >
                                {log.action}
                              </span>
                            ) : (
                              <span style={{ color: "#9ca3af" }}>—</span>
                            )}
                          </td>
                          <td className={`${styles.tableCell} ${styles.tableCellMedium}`}>
                            {formatDate(log.timestamp)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
