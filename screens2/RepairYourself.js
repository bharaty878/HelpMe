import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

// List of common car problems with an explanation and their fixes
const carProblems = [
  { 
    problem: 'Flat Tire', 
    explanation: 'A flat tire occurs when there is a loss of air pressure in the tire, usually due to a puncture or damage.',
    fix: 'To fix a flat tire, use a jack to lift the car, loosen the lug nuts with a wrench, and replace the flat tire with a spare. Tighten the lug nuts back up and lower the car safely.'
  },
  { 
    problem: 'Dead Battery', 
    explanation: 'A dead battery happens when the battery is no longer able to hold enough charge to start the car, often caused by a faulty alternator or leaving lights on.',
    fix: 'To fix this, jump-start the car with jumper cables and another vehicle with a charged battery. If this doesn’t work, replace the battery with a new one.'
  },
  { 
    problem: 'Worn or Broken Spark Plugs', 
    explanation: 'Spark plugs ignite the fuel in the engine. When they are worn or broken, the engine may misfire, run rough, or consume more fuel.',
    fix: 'To replace spark plugs, you need to remove the old ones with a spark plug wrench and install new ones. This will help improve engine performance and fuel efficiency.'
  },
  { 
    problem: 'Oil Change', 
    explanation: 'Old or dirty oil can cause the engine to run inefficiently, leading to overheating and wear on engine components.',
    fix: 'To change the oil, drain the old oil from the engine, replace the oil filter, and refill with fresh oil of the correct type and quantity.'
  },
  { 
    problem: 'Worn Brake Pads', 
    explanation: 'Brake pads wear down over time due to friction. If they are too worn, the braking performance will be reduced, and it may cause damage to the brake rotors.',
    fix: 'To replace the brake pads, remove the wheel, take off the caliper, and replace the old pads with new ones. Be sure to check the rotor condition as well.'
  },
  { 
    problem: 'Clogged Air Filter', 
    explanation: 'A clogged air filter restricts airflow to the engine, causing the engine to work harder and reducing fuel efficiency.',
    fix: 'To replace the air filter, locate the filter box, remove the old filter, and install a new one. This is a simple fix that can greatly improve engine performance.'
  },
  { 
    problem: 'Blown Fuses', 
    explanation: 'A blown fuse causes electrical components in the car (e.g., lights, radio) to stop working because it prevents the flow of electricity.',
    fix: 'To replace a blown fuse, locate the fuse box, identify the faulty fuse, and replace it with a new one of the same amperage.'
  },
  { 
    problem: 'Low or Leaking Power Steering Fluid', 
    explanation: 'Low or leaking power steering fluid can cause difficulty in steering the vehicle or produce a whining noise.',
    fix: 'To fix this, check the fluid level and top it off if necessary. If there’s a leak, inspect the power steering pump or hoses and replace the damaged parts.'
  },
  { 
    problem: 'Wiper Blade Replacement', 
    explanation: 'Worn wiper blades can leave streaks on your windshield, reducing visibility and safety during rain.',
    fix: 'To replace the wiper blades, remove the old blades from the wiper arms and attach the new blades. This is an easy fix that ensures clear visibility.'
  },
  { 
    problem: 'Loose or Broken Serpentine Belt', 
    explanation: 'The serpentine belt drives various engine components like the alternator and air conditioning. If it’s broken or loose, these components will stop working.',
    fix: 'To replace the serpentine belt, remove the old one and replace it with a new one. You may need to loosen the tensioner to install the new belt.'
  },
  { 
    problem: 'Dirty Fuel Injector', 
    explanation: 'Fuel injectors deliver fuel to the engine. If they are clogged or dirty, the engine may misfire or run inefficiently.',
    fix: 'To clean the fuel injectors, you can use a fuel injector cleaner. For a more thorough cleaning, it may require removing the injectors and using specialized cleaning tools.'
  },
  { 
    problem: 'Replace Headlights/Taillights', 
    explanation: 'Headlights or taillights that are burned out can make it difficult to see and be seen, which is dangerous, especially at night.',
    fix: 'To replace a burnt-out headlight or taillight, simply remove the old bulb and replace it with a new one. Be sure to check the electrical connections.'
  },
  { 
    problem: 'Flat Tire Fix with a Tire Repair Kit', 
    explanation: 'A tire repair kit can temporarily fix a punctured tire, allowing you to drive to a location where you can get the tire properly repaired or replaced.',
    fix: 'To use a tire repair kit, follow the instructions on the kit, which usually involve inserting a rubber plug or patch into the puncture.'
  },
  { 
    problem: 'Replace Cabin Air Filter', 
    explanation: 'The cabin air filter helps keep dust, pollen, and pollutants from entering the car’s cabin. A dirty filter can reduce air quality and airflow.',
    fix: 'To replace the cabin air filter, locate it behind the glove box or under the dashboard, remove the old one, and replace it with a new filter.'
  },
  { 
    problem: 'Check and Top Up Coolant', 
    explanation: 'Coolant helps maintain the engine’s temperature. Low coolant levels can lead to engine overheating and potential damage.',
    fix: 'To top up the coolant, locate the coolant reservoir and fill it to the recommended level with the correct type of coolant for your car.'
  },
  { 
    problem: 'Fix Minor Electrical Issues (e.g., Faulty Light Bulb or Switch)', 
    explanation: 'Electrical issues like malfunctioning lights or switches can affect various systems in your car.',
    fix: 'To fix these, check the fuse box for blown fuses, replace any damaged bulbs, and test switches for faults.'
  },
  { 
    problem: 'Fix a Leaking Exhaust Pipe', 
    explanation: 'A leaking exhaust pipe can lead to loud noises and can allow harmful gases to enter the car’s cabin.',
    fix: 'To temporarily fix a leaking exhaust pipe, you can use exhaust repair tape. For a permanent fix, the damaged section of the pipe may need to be replaced.'
  },
  { 
    problem: 'Wheel Alignment (Temporary Fix with Tire Balancing)', 
    explanation: 'If the wheels are out of alignment, the car may pull to one side or cause uneven tire wear.',
    fix: 'While a full wheel alignment requires professional help, you can balance the tires to reduce uneven wear and improve handling.'
  },
  { 
    problem: 'Replace a Windshield Washer Pump', 
    explanation: 'If the windshield washer pump fails, the washer fluid won’t be sprayed onto the windshield, making it difficult to clean the glass.',
    fix: 'To fix this, replace the faulty windshield washer pump with a new one.'
  },
  { 
    problem: 'Minor Paint Scratches', 
    explanation: 'Small paint scratches can occur from everyday wear and tear or small accidents.',
    fix: 'To fix minor paint scratches, use a scratch repair kit to buff out the scratch and apply touch-up paint for a clean finish.'
  }
]

const RepairYourself = () => {
  const [visibleIndex, setVisibleIndex] = useState(null)

  const toggleAnswerVisibility = (index) => {
    setVisibleIndex(visibleIndex === index ? null : index)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Common Car Problems and How to Repair Them</Text>
      <FlatList
        data={carProblems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => toggleAnswerVisibility(index)} style={styles.problemContainer}>
              <Text style={styles.problem}>{item.problem}</Text>
            </TouchableOpacity>
            {visibleIndex === index && (
              <View style={styles.answer}>
                <Text style={styles.explanation}>{item.explanation}</Text>
                <Text style={styles.fix}>{item.fix}</Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  )
}

export default RepairYourself

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F9FC',  // Light background color for a calm, clean feel
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2F3A56',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 1.5,
    lineHeight: 32,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
    marginHorizontal: 10,  // To add margin from sides
  },
  problemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 12,
    borderBottomColor: 'black',
    paddingBottom: 15,
    marginBottom: 15,
  },
  problem: {
    fontSize: 20,
    fontWeight: '600',
    color: 'red',  // Bright blue for the problem name
    flex: 1,
    paddingRight: 10,
  },
  answer: {
    marginTop: 15,
  },
  explanation: {
    fontSize: 16,
    color: '#FF5733',  // Red for explanations to highlight issues
    marginBottom: 10,
    lineHeight: 22,
  },
  fix: {
    fontSize: 16,
    color: '#28A745',  // Green for fixes to indicate solution
    lineHeight: 22,
  },
  itemTouchable: {
    borderRadius: 10,
    backgroundColor: '#F0F4F8',
    padding: 10,
    marginBottom: 10,
    transition: 'background-color 0.2s ease',
  },
  itemTouchableActive: {
    backgroundColor: '#E1F5FE',  // Light blue for active state (when clicked)
  }
})
