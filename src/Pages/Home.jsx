import Veggie from '../components/Veggie'
import Popular from '../components/Popular'
import { motion } from 'framer-motion'


function Home() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
        >
            <Veggie />
            <Popular />
        </motion.div>
    )
}

export default Home