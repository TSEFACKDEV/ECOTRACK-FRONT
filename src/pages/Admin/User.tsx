import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';
import { FiEdit, FiTrash2, FiUser, FiMail, FiPhone, FiShield } from 'react-icons/fi';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  tel?: string;
  role: 'ADMIN' | 'CITOYEN';
  isActive: boolean;
  createdAt: string;
}

const User = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<User>>({});
  const { user: currentUser } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await api.delete(`/user/${userId}`);
        toast.success('Utilisateur supprimé avec succès');
        fetchUsers();
      } catch (error) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const handleEdit = (user: User) => {
    setEditingUserId(user.id);
    setEditForm({
      firstName: user.firstName,
      lastName: user.lastName,
      tel: user.tel,
      role: user.role,
      isActive: user.isActive,
    });
  };

  const handleUpdate = async (userId: string) => {
    try {
      await api.put(`/user/${userId}`, editForm);
      toast.success('Utilisateur mis à jour avec succès');
      setEditingUserId(null);
      fetchUsers();
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: name === 'isActive' ? value === 'true' : value
    }));
  };

  if (loading) {
    return <div className="p-8 text-center">Chargement...</div>;
  }

  return (
    <div className="p-2 sm:p-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-2 sm:p-4 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Gestion des utilisateurs</h2>
        </div>
        {/* Ajout d'un conteneur overflow-x-auto et min-w-full */}
        <div className="w-full overflow-x-auto">
          <table className="min-w-[600px] sm:min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Utilisateur</th>
                <th className="px-2 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Email</th>
                <th className="px-2 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Téléphone</th>
                <th className="px-2 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Rôle</th>
                <th className="px-2 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Statut</th>
                <th className="px-2 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-2 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                    {editingUserId === user.id ? (
                      <input
                        type="text"
                        name="firstName"
                        value={editForm.firstName || ''}
                        onChange={handleInputChange}
                        className="border rounded p-1 w-full"
                      />
                    ) : (
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <FiUser className="text-green-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            Inscrit le {new Date(user.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-2 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiMail className="mr-2 text-gray-400" />
                      <span className="text-sm text-gray-900">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-2 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                    {editingUserId === user.id ? (
                      <input
                        type="text"
                        name="tel"
                        value={editForm.tel || ''}
                        onChange={handleInputChange}
                        className="border rounded p-1 w-full"
                      />
                    ) : (
                      <div className="flex items-center">
                        <FiPhone className="mr-2 text-gray-400" />
                        <span className="text-sm text-gray-900">{user.tel || '-'}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-2 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                    {editingUserId === user.id ? (
                      <select
                        name="role"
                        value={editForm.role}
                        onChange={handleInputChange}
                        className="border rounded p-1 w-full"
                      >
                        <option value="ADMIN">Admin</option>
                        <option value="CITOYEN">Citoyen</option>
                      </select>
                    ) : (
                      <div className="flex items-center">
                        <FiShield className="mr-2 text-gray-400" />
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          user.role === 'ADMIN' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role === 'ADMIN' ? 'Administrateur' : 'Citoyen'}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-2 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                    {editingUserId === user.id ? (
                      <select
                        name="isActive"
                        value={editForm.isActive?.toString()}
                        onChange={handleInputChange}
                        className="border rounded p-1 w-full"
                      >
                        <option value="true">Actif</option>
                        <option value="false">Inactif</option>
                      </select>
                    ) : (
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? 'Actif' : 'Inactif'}
                      </span>
                    )}
                  </td>
                  <td className="px-2 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium">
                    {editingUserId === user.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdate(user.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Enregistrer
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Annuler
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleEdit(user)}
                          disabled={user.id === currentUser?.id}
                          className={`text-blue-600 hover:text-blue-900 ${
                            user.id === currentUser?.id ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          <FiEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          disabled={user.id === currentUser?.id}
                          className={`text-red-600 hover:text-red-900 ${
                            user.id === currentUser?.id ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          <FiTrash2 size={16} />
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
    </div>
  );
};

export default User;