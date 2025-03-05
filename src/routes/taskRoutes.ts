import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();
const domainName = 'domain_name'; 
const accessToken = 'access_token'; 
const webhookDestination = 'http://webhooks.avantiiva.com/ff9ef597-cccc-42ee-ffff-52cb55a04f0e';
const webhookSettings = ["note_lead","status_lead","note_contact"]

router.get('/checkStatus', async (req: Request, res: Response) => {
  const url = `https://${domainName}.amocrm.ru/api/v4/webhooks?page=0`;

  try {
    // const response = await axios.get(url, {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // });

    /*
    const webhooks = response.data._embedded.webhooks;
    const targetWebhook = webhooks.find((hook: any) => hook.destination === webhookDestination);
    */

    // Пример мока ответа
    const mockResponse = {
        "_total_items": 3,
        "_embedded": {
            "webhooks": [{
                    "id": 5044731,
                    "destination": "https://api.roydis.tech/hooks/amocrm/tasks_responsible",
                    "created_at": 1680591792,
                    "updated_at": 1730626214,
                    "account_id": 29005714,
                    "created_by": 7542007,
                    "sort": 1,
                    "disabled": false,
                    "settings": ["responsible_lead", "responsible_company", "responsible_contact"]
                }, {
                    "id": 62783,
                    "destination": "https://umnico.com/api/webhooks/amocrm2",
                    "created_at": 1686082289,
                    "updated_at": 1738752110,
                    "account_id": 29005714,
                    "created_by": 6254656,
                    "sort": 1,
                    "disabled": false,
                    "settings": ["status_lead", "add_unsorted"]
                }, {
                    "id": 43022,
                    "destination": "http://webhooks.avantiiva.com/ff9ef597-cccc-42ee-ffff-52cb55a04f0e",
                    "created_at": 1737129421,
                    "updated_at": 1737129421,
                    "account_id": 29005714,
                    "created_by": 6254656,
                    "sort": 1,
                    "disabled": true, // тест
                    "settings": ["note_lead", "status_lead", "note_contact"]
                }
            ]
        }
    };
    
    

    const webhooks = mockResponse._embedded.webhooks;
    const targetWebhook = webhooks.find((hook: any) => hook.destination === webhookDestination);

    if (targetWebhook && targetWebhook.disabled) {
      await deleteWebhook();
      await createWebhook();
      res.status(200).json({ message: 'Webhook updated' });
    } else {
      res.status(200).json(mockResponse);
    }
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching webhooks', err });
  }
});

async function deleteWebhook() {
  const url = `https://${domainName}.amocrm.ru/api/v4/webhooks`;
  try {
    /*
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        destination: webhookDestination,
      },
    });
    */
    
    console.log('Webhook deleted (mock)');
  } catch (err: any) {
    console.error('Error deleting webhook:', err);
  }
}

async function createWebhook() {
  const url = `https://${domainName}.amocrm.ru/api/v4/webhooks`;
  try {
    /*
    await axios.post(url, {
      destination: webhookDestination,
      settings: webhookSettings,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    */
    
    console.log('Webhook created (mock)');
  } catch (err: any) {
    console.error('Error creating webhook:', err);
  }
}

export default router;
