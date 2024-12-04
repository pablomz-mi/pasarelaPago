import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
// credenciales supabase
const supabaseUrl = 'https://jtetegxxcatpyjakkcky.supabase.co/';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0ZXRlZ3h4Y2F0cHlqYWtrY2t5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1MTIyNDAsImV4cCI6MjA0NTA4ODI0MH0.pAxwsvAEd80sYbqHE5AF0u_RT7KKDiHnOtw5YQ3BM_0';
const supabase = createClient(supabaseUrl, supabaseKey);

var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
    event.preventDefault();

    var nombre = document.getElementById('nombre').value;
    var apellidos = document.getElementById('apellidos').value;
    var email = document.getElementById('email').value;
    var token = generateToken(); 

    console.log('Token created successfully:', token);
    supabaseTokenHandler(nombre, apellidos, email, token);
});

function generateToken() {
    return Math.random().toString(10).substr(2);
}

async function supabaseTokenHandler(nombre, apellidos, email, token) {
    const { data, error } = await supabase
        .from('Pagos')
        .insert([
            { nombre: nombre, apellidos: apellidos, email: email, token: token }
        ]);

    if (error) {
        console.error('Error inserting data:', error);
    } else {
        console.log('Data inserted successfully:', data);
        // enlace a la pasarela de pago
        window.location.href = 'https://buy.stripe.com/test_00gbMN1sw6Pm4q49AA';
    }
}