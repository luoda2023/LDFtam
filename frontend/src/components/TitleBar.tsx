import { getCurrentWindow } from '@/lib/platform-api'
import { Minus, X } from 'lucide-react'
import { IS_TAURI } from '@/lib/platform'
import { useTranslation } from '@/i18n'

interface TitleBarProps {
	title?: string
}

export const TitleBar = ({ title }: TitleBarProps) => {
	const { t } = useTranslation()
	if (!IS_TAURI) {
		return null
	}

	const handleMinimize = async () => {
		const window = await getCurrentWindow()
		await window.minimize()
	}

	const handleClose = async () => {
		const window = await getCurrentWindow()
		await window.close()
	}

	return (
		<div className="custom-title-bar" data-tauri-drag-region>
			<div className="flex-1" data-tauri-drag-region>
				<span className="text-sm font-medium opacity-70" data-tauri-drag-region>
					{title}
				</span>
			</div>

			<div className="window-controls">
				<button
					type="button"
					onClick={handleMinimize}
					className="window-control-btn"
					aria-label={t('common:windowControls.minimize')}
					title={t('common:windowControls.minimize')}
				>
					<Minus className="w-4 h-4" />
				</button>
				<button
					type="button"
					onClick={handleClose}
					className="window-control-btn close"
					aria-label={t('common:windowControls.close')}
					title={t('common:windowControls.close')}
				>
					<X className="w-4 h-4" />
				</button>
			</div>
		</div>
	)
}
