import React, { useEffect, useState } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiSave, FiX } from 'react-icons/fi';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';

const AdminPlanning = () => {
  const [plannings, setPlannings] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [newPlanning, setNewPlanning] = useState({
    pointName: '',
    city: '',
    neighborhood: '',
    collectionDate: '',
    duration: 60,
    frequency: 'HEBDOMADAIRE'
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPlannings();
  }, []);

  const fetchPlannings = async () => {
    const response = await api.get('/planning');
    setPlannings(response.data.data);
  };

  const handleCreate = async () => {
    try {
      await api.post('/planning', newPlanning);
      toast.success('Planning créé');
      setShowForm(false);
      fetchPlannings();
    } catch (error) {
      toast.error('Erreur lors de la création');
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await api.put(`/planning/${id}`, editData);
      toast.success('Planning mis à jour');
      setEditingId(null);
      fetchPlannings();
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Supprimer ce planning ?')) {
      await api.delete(`/planning/${id}`);
      toast.success('Planning supprimé');
      fetchPlannings();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Gestion du Planning</h2>
        <button 
          onClick={() => setShowForm(true)}
          className="btn1 flex items-center gap-2"
        >
          <FiPlus /> Ajouter un Planning
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h3 className="font-medium mb-4">Nouveau Planning</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Nom du point"
              className="border p-2 rounded"
              value={newPlanning.pointName}
              onChange={(e) => setNewPlanning({...newPlanning, pointName: e.target.value})}
            />
            <input
              placeholder="Ville"
              className="border p-2 rounded"
              value={newPlanning.city}
              onChange={(e) => setNewPlanning({...newPlanning, city: e.target.value})}
            />
            <input
              placeholder="Quartier"
              className="border p-2 rounded"
              value={newPlanning.neighborhood}
              onChange={(e) => setNewPlanning({...newPlanning, neighborhood: e.target.value})}
            />
            <input
              type="datetime-local"
              className="border p-2 rounded"
              value={newPlanning.collectionDate}
              onChange={(e) => setNewPlanning({...newPlanning, collectionDate: e.target.value})}
            />
            <select
              className="border p-2 rounded"
              value={newPlanning.frequency}
              onChange={(e) => setNewPlanning({...newPlanning, frequency: e.target.value})}
            >
              <option value="QUOTIDIEN">Quotidien</option>
              <option value="HEBDOMADAIRE">Hebdomadaire</option>
              <option value="MENSUEL">Mensuel</option>
            </select>
            <input
              type="number"
              placeholder="Durée (minutes)"
              className="border p-2 rounded"
              value={newPlanning.duration}
              onChange={(e) => setNewPlanning({...newPlanning, duration: parseInt(e.target.value)})}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={() => setShowForm(false)} className="btn2">
              <FiX /> Annuler
            </button>
            <button onClick={handleCreate} className="btn1">
              <FiSave /> Enregistrer
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Point</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Localisation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date/Heure</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {plannings.map((planning) => (
              <tr key={planning.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === planning.id ? (
                    <input
                      value={editData.pointName || planning.pointName}
                      onChange={(e) => setEditData({...editData, pointName: e.target.value})}
                      className="border p-1 w-full"
                    />
                  ) : (
                    planning.pointName
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === planning.id ? (
                    <div className="space-y-2">
                      <input
                        value={editData.city || planning.city}
                        onChange={(e) => setEditData({...editData, city: e.target.value})}
                        className="border p-1 w-full"
                      />
                      <input
                        value={editData.neighborhood || planning.neighborhood}
                        onChange={(e) => setEditData({...editData, neighborhood: e.target.value})}
                        className="border p-1 w-full"
                      />
                    </div>
                  ) : (
                    `${planning.neighborhood}, ${planning.city}`
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === planning.id ? (
                    <input
                      type="datetime-local"
                      value={editData.collectionDate || planning.collectionDate}
                      onChange={(e) => setEditData({...editData, collectionDate: e.target.value})}
                      className="border p-1"
                    />
                  ) : (
                    new Date(planning.collectionDate).toLocaleString('fr-FR')
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === planning.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(planning.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <FiSave />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <FiX />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          setEditingId(planning.id);
                          setEditData({
                            pointName: planning.pointName,
                            city: planning.city,
                            neighborhood: planning.neighborhood,
                            collectionDate: planning.collectionDate
                          });
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(planning.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPlanning;