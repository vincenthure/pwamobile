import NetworkSpeed from 'network-speed'
import { toast } from 'react-toastify';


export default function speedTest()
    {
      const testNetworkSpeed = new NetworkSpeed()
      const baseUrl = 'https://eu.httpbin.org/stream-bytes/500000'
      const fileSizeInBytes = 500000

      testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSizeInBytes)
          .then(res => { toast.info("vitesse de connexion " + res.mbps + " mbps") })
    }
