import { motion } from 'framer-motion'
import { FiAward, FiExternalLink } from 'react-icons/fi'

const CertCard = ({ certification }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
    >
      <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <FiAward className="text-white text-7xl opacity-20 absolute" />
          <FiAward className="text-white text-6xl" />
        </motion.div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {certification.name}
        </h3>

        <p className="text-blue-500 dark:text-blue-400 font-semibold mb-2">
          {certification.issuer}
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Issued: {certification.date}
        </p>

        {certification.description && (
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            {certification.description}
          </p>
        )}

        {certification.credentialId && (
          <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
            Credential ID: {certification.credentialId}
          </p>
        )}

        {certification.credentialLink && (
          <motion.a
            href={certification.credentialLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 text-blue-500 dark:text-blue-400 hover:underline text-sm font-medium"
          >
            <FiExternalLink />
            View Credential
          </motion.a>
        )}
      </div>
    </motion.div>
  )
}

export default CertCard
