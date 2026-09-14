import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';

// ---------------------------------------------------------
// App simple : une liste de tâches (To-Do List)
// Elle montre les bases de React Native :
// - useState (gérer un état)
// - TextInput (champ de saisie)
// - FlatList (afficher une liste)
// - TouchableOpacity (bouton pressable)
// - StyleSheet (styles, comme du CSS)
// ---------------------------------------------------------

export default function App() {
  // 'tasks' est notre liste de tâches, 'setTasks' sert à la modifier
  const [tasks, setTasks] = useState([
    { id: '1', text: 'Apprendre les bases de React Native', done: false },
    { id: '2', text: 'Créer mon premier composant', done: false },
  ]);

  // 'text' contient ce que l'utilisateur tape dans le champ
  const [text, setText] = useState('');

  // Ajoute une nouvelle tâche à la liste
  function addTask() {
    if (text.trim() === '') return; // on ignore si le champ est vide
    const newTask = {
      id: Date.now().toString(), // identifiant unique simple
      text: text,
      done: false,
    };
    setTasks([newTask, ...tasks]);
    setText(''); // on vide le champ après ajout
  }

  // Coche / décoche une tâche
  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  // Supprime une tâche
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>📝 Ma liste de tâches</Text>

      {/* Zone de saisie + bouton d'ajout */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Nouvelle tâche..."
          value={text}
          onChangeText={setText}
          onSubmitEditing={addTask} // valider avec "Entrée"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Ajouter</Text>
        </TouchableOpacity>
      </View>

      {/* Liste des tâches */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.empty}>Aucune tâche pour le moment 🎉</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => toggleTask(item.id)}
            >
              <Text
                style={[
                  styles.taskText,
                  item.done && styles.taskDone, // style conditionnel
                ]}
              >
                {item.done ? '✅ ' : '⬜ '}
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

// Les styles ressemblent au CSS mais s'écrivent en JavaScript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF00',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 90,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#0000FF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#4f46e5',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
  },
  taskDone: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteText: {
    fontSize: 18,
    marginLeft: 10,
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
  },
});
